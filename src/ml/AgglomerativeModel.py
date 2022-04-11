import numpy as np
import pandas as pd
import os
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import AgglomerativeClustering

def get_best_privileges(user_data, job, department):

	# Initialize df for the data provided to model
	user_privs_data = pd.DataFrame()

	# Create dummie table for every privilege
	priv_dummies = pd.DataFrame()
	priv_dummies['user_id'] = user_data.user_id

	# Concat priv_dummies and created dummies from user_data
	priv_dummies = pd.concat([priv_dummies,pd.get_dummies(user_data.priv)], axis=1)

	# Compress data so that one record will contain unique values
	user_privs_data = priv_dummies.groupby('user_id').sum().reset_index()

	#Initialize Agglomerative clustering instanse from sklearn
	agg_clustering = AgglomerativeClustering(n_clusters=None, compute_full_tree=True, distance_threshold=20)

	# fit the data without user_id
	fit_data = agg_clustering.fit(user_privs_data.drop('user_id', axis=1))

	# get result from agglometrative model - cluster labels
	result = pd.DataFrame(fit_data.labels_, columns=['id'])

	# create new df that will be used for establishing users in provided cluster
	unique_user_data = user_data.groupby(['user_id', 'job', 'department']).describe().reset_index()

	# drop unneeded columns
	unique_user_data.drop(['system_name', 'priv'], axis=1, inplace=True)

	# rename columns
	unique_user_data.columns = ['user_id', 'job', 'department']

	# concat unique_user_data with one hot encoded privileges data
	result_table = pd.concat([unique_user_data, user_privs_data.drop('user_id', axis=1)], axis=1)

	# add cluster label to result table
	result_table.insert(3, "cluster_label", result.id)


	# Get data with specified job and department
	result_data = result_table.where((result_table.job == job) & (result_table.department == department))

	# drop NaN values
	result_data.dropna(inplace=True)

	# reset index 
	result_data = result_data.reset_index()

	# get best cluster label
	best_cluster_label = result_data.cluster_label.value_counts().index.tolist()[0]

	# get data with best cluster label
	current_cluster_label_data = result_table[result_table['cluster_label'] == best_cluster_label]

	# reset index
	current_cluster_label_data.reset_index(inplace=True)


	# get users count from cluster
	users_count = current_cluster_label_data.shape[0]

	# remove 'index' column if exists
	if 'index' in current_cluster_label_data.columns:
	  current_cluster_label_data = current_cluster_label_data.drop('index', axis=1)

	# get privileges frequency from selected data 
	privileges_counts = {}
	for pr in current_cluster_label_data.columns[4:]:
	  if 1 in current_cluster_label_data[pr].value_counts().index.tolist():
		privileges_counts[pr] = current_cluster_label_data[pr].value_counts()[1]

	# sort privileges_counts 
	sorted_privileges_counts = sorted(privileges_counts.items(), key=lambda x: x[1], reverse=True)

	# filter privileges_count to get the best privileges
	filtered_privileges_counts = list(filter(lambda x: x[1] > users_count*0.9, sorted_privileges_counts))

	# get just privilege name
	suggested_privileges = [v[0] for v in filtered_privileges_counts]

	return suggested_privileges

