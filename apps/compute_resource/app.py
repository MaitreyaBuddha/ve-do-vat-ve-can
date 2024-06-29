from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler

def my_job():
    # We'll do the dummy reporting here.
    print("Job Running...")

app = Flask(__name__)

scheduler = BackgroundScheduler()
job = scheduler.add_job(my_job, 'interval', seconds=1)
scheduler.start()

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)