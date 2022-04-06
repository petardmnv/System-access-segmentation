import pandas as pd
import os
from flask import Flask, jsonify, request

app = Flask(__name__)


# load_file this function loads file from filepath
def load_file(filepath):
    #I need to get the extention of the file to know how to open it
    ext = filepath.split('.')[-1]
    if ext == 'xlsx':
        data = pd.read_excel(filepath, skiprows=1)
        print(data, flush=True)
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
    print(type(data))
    remove_unneded_content(data, "privileges_data", 10)


#separate column privileges to two column for better db normalization
def separate_privileges_column(data, column):
    data['system_name'], data['priv'] = data[column].str.split(':', 1, expand=True)[0], data[column].str.split(':', 1, expand=True)[1]
    return data.drop(column, axis=1)
    #return data.drop('privileges_data', axis=1)

# get best privileges by getting them distribution from segmented data 
def get_best_privileges_on_average_distribution(data, job, department):
    try:
        # get data containing  provided job and privilege 
        segmentated_data = data.where((data.job == job) & (data.department == department))
        avarege_count = int(segmentated_data.priv.value_counts().sum() / len(segmentated_data.priv.value_counts()))
        count = 0
        for p_c in segmentated_data.priv.value_counts():
            if p_c < avarege_count:
                break
            count += 1
        return segmentated_data.priv.value_counts().index.tolist()[:count]
    except Exception as e:
        raise e


# remove file by provided filepath
def remove_file(filepath):
    os.remove(filepath)
 

# Execute all function and return razult final result to run()
def get_result(job, department, filename):
    filepath = '../server/public/data/'+str(filename)
    try:
        data = load_file(filepath)
        set_columns(data)
        data = separate_privileges_column(data, "privileges_data")
        result = get_best_privileges_on_average_distribution(data, job, department)
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
