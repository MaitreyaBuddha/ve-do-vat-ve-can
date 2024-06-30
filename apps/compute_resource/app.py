from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import requests
import json


def my_job():
    url = "http://localhost:3000/compute-unit/webhook"  # replace with your actual server URL

    data = {
        "workerNodeId": "node1",
        "workload": 100
    }

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, data=json.dumps(data), headers=headers)

    print(response.status_code)
    print(response.json())


app = Flask(__name__)

scheduler = BackgroundScheduler()
job = scheduler.add_job(my_job, 'interval', seconds=5)
scheduler.start()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)