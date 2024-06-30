import random
from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import requests
import json

WALLET = "0x1A86c939A613E58Dde6BF28ee45f29BbE53112C9"


def generate_random_integer(min, max):
    return int(random.random() * (max - min) + min)


def earn_job():
    url = "http://localhost:3000/submitEarn"

    data = {
        "participant": WALLET,
        "amount": str(generate_random_integer(50, 150)),
    }

    headers = {"Content-Type": "application/json"}

    response = requests.post(url, data=json.dumps(data), headers=headers)

    print(response.status_code)
    print(response.json())


app = Flask(__name__)

scheduler = BackgroundScheduler()
job = scheduler.add_job(earn_job, "interval", seconds=5)
scheduler.start()


@app.route("/")
def hello_world():  # put application's code here
    return "Hello World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
