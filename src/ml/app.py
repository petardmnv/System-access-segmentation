import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.cluster import AgglomerativeClustering
from flask import Flask, jsonify, request

app = Flask(__name__)


# load_file this function loads file from filepath
def load_file(filepath):
    # I need to get the extention of the file to know how to open it
    ext = filepath.split('.')[-1]
    if ext == 'xlsx':
        data = pd.read_excel(filepath, skiprows=1)
        # drop nan values
        return data.dropna()
    elif ext == 'csv':
        data = pd.read_csv(filepath, skiprows=1)
        return data.dropna()


# I provided data all rowa from priveleges are like this template: PRIV:ROLE:xxx:xxxxx:x...
# I need to remove first 9 chars from it so this function is implementing that logic
def remove_unneded_content(data, column, chars_count):
    data[column]= data[column].str[chars_count:]


# set new column names
def set_columns(data):   
    data.columns = ["user_id", "job", "department", "privileges_data"]
    remove_unneded_content(data, "privileges_data", 10)


def stratify_data(data):
	
	# Set columns name and remove PRIV:ROLE: string from every record
	set_columns(data)

	# Create array with vaslue counts for every privilege
	class_to_counts = data.privileges_data.value_counts()

	# Create ne coilumn in data for priv count
	data['times_occured'] = data['privileges_data'].apply(lambda y: class_to_counts[y])

	# Cast type to int
	data.times_occured = data.times_occured.astype(int)

	# Add records that have 1 occurence in dataset based on priv value from data to new pd df
	data_with_privileges_found_one_time = data.where(data['times_occured'] == 1).dropna()

	# Again cast column to int
	data_with_privileges_found_one_time.times_occured = data_with_privileges_found_one_time.times_occured.astype(int)

	# Drop records which are part of data_with_privileges_found_one_time from data 
	data.drop(data_with_privileges_found_one_time.index, inplace=True)

	# Reset index
	data = data.reset_index(drop=True)

	# Drop inneed column
	data.drop('times_occured', axis=1, inplace=True)

	# Split data into two parts 4/6, by stratifing privileges
	X_train, X_test = train_test_split(data, train_size=0.2, shuffle=True, stratify=data.privileges_data) 
	data = X_train
	
	return data.reset_index(drop=True)


def normalize_data(data):
	
	# get user data without privileges data
	user_data = data.drop("privileges_data", axis=1)

	# create df with privileges data
	privileges_data = pd.DataFrame(data["privileges_data"])

	#I saw anomaly in data where in some of the records there is ::(double) symbols so i need to remove it so the data is clear
	for indx in privileges_data[privileges_data["privileges_data"].str.startswith(":")].index.tolist():
		privileges_data.loc[indx].privileges_data = privileges_data.loc[indx].privileges_data[1:]

	# separate column 
	privileges_data['priv'] = privileges_data['privileges_data']
	privileges_data['system_name'] = privileges_data['privileges_data'].str.split(':', 1, expand=True)[0]


	# remove unneeded unnormalized column 
	privileges_data = privileges_data.drop('privileges_data', axis=1)

	# add normalized columns to the user_data 
	user_data['system_name'] = privileges_data['system_name']
	user_data['priv'] = privileges_data['priv']
	
	return user_data


# get best privileges by getting them distribution from segmented data 
def get_best_privileges(user_data, job, department):
	try:
		# Initialize df for the data provided to model
		user_privs_data = pd.DataFrame()

		# Create dummie table for every privilege
		priv_dummies = pd.DataFrame()
		priv_dummies['user_id'] = user_data.user_id

		# Concatenate priv_dummies and created dummies from user_data
		priv_dummies = pd.concat([priv_dummies, pd.get_dummies(user_data.priv, dtype=np.ubyte)], axis=1)

		# Cast column to type int
		priv_dummies = priv_dummies.drop('user_id', axis=1).astype('byte')
		

		priv_dummies['user_id'] = user_data.user_id

		# Compress data so that one record will contain unique values
		user_privs_data = priv_dummies.groupby('user_id').sum().reset_index(drop=True)


		user_privs_data['user_id'] = user_data.user_id

		# Initialize Agglomerative clustering instanse from sklearn
		agg_clustering = AgglomerativeClustering(n_clusters=None, compute_full_tree=True, distance_threshold=11)

		# Fit the data without user_id
		fit_data = agg_clustering.fit(user_privs_data.drop('user_id', axis=1))

		# Get result from agglometrative model - cluster labels
		result = pd.DataFrame(fit_data.labels_, columns=['id'])

		# Create new df that will be used for establishing users in provided cluster
		unique_user_data = user_data.groupby(['user_id', 'job', 'department']).describe().reset_index()


		unique_user_data.drop(['system_name', 'priv'], axis=1, inplace=True)


		unique_user_data.columns = ['user_id', 'job', 'department']

		# Concatenate unique_user_data with one hot encoded privileges data
		result_table = pd.concat([unique_user_data, user_privs_data.drop('user_id', axis=1)], axis=1)

		# Add cluster label to result table on given index in columns
		result_table.insert(3, "cluster_label", result.id)

		# Get data with specified job and department
		result_data = result_table.where((result_table.job == job) & (result_table.department == department))
		result_data.dropna(inplace=True)
		result_data = result_data.reset_index(drop=True)

		
		# This part of code is implemented to get data from more than one cluster if needed
		index = 1
		# if len(result_data.cluster_label.value_counts().index.tolist()) > 3:
		#   index = 2

		best_cluster_label = result_data.cluster_label.value_counts().index.tolist()[0: index]

		
		privileges_counts = {}
		users_count = 0
		for c in best_cluster_label:
			# Get data with cluster label
			current_cluster_label_data = result_data[result_data['cluster_label'] == c]
			current_cluster_label_data.reset_index(drop=True, inplace=True)
			
			# Add users count from sample to usera_count for future separating of provided data
			users_count += current_cluster_label_data.shape[0]
			if 'index' in current_cluster_label_data.columns:
				current_cluster_label_data = current_cluster_label_data.drop('index', axis=1)
			
			# Search for all roles and add to priveleges_count curr priv count in data
			for pr in current_cluster_label_data.columns[4:]:
				if 1 in current_cluster_label_data[pr].value_counts().index.tolist():
					if pr not in privileges_counts.keys():
						privileges_counts[pr] = 0
					privileges_counts[pr] += current_cluster_label_data[pr].value_counts()[1]

		# Sort privileges_count (not needed )
		#privileges_counts = dict(sorted(privileges_counts.items(),key= lambda x:x[1]))
		sorted_privileges_counts = sorted(privileges_counts.items(), key=lambda x: x[1], reverse=True)

		# Filter privileges_count to get the best privileges
		filtered_privileges_counts = list(filter(lambda x: x[1] > users_count*0.4, sorted_privileges_counts))

		# Get just privileges names and return them
		suggested_privileges = [v[0] for v in filtered_privileges_counts]


		return suggested_privileges
	except Exception as e:
		raise e


# remove file by provided filepath
def remove_file(filepath):
    os.remove(filepath)
 

# Execute all functions and return cluster result to run() function
def get_result(job, department, filename):
	filepath = '../server/public/data/'+str(filename)
	try:
		data = load_file(filepath)
		print(data)
		data = stratify_data(data)
		print(data)
		data = normalize_data(data)
		print(data)
		result = get_best_privileges(data, job, department)
		print(result)
		return result
	except Exception as e:
		raise e
	finally:
		remove_file(filepath)


@app.route('/run', methods = ['POST'])
# create run route which will get data for running ml model. It returns error or model result
def run():
        content = request.json
        job = content['job']
        department = content['department']
        filename = content['filename']
        try:
		        result = get_result(job, department, filename)
		        return jsonify({'result': result}), 200
        except Exception as e:
            print(e)
            return jsonify({'message': str(e)}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082, debug=True)
