from urllib import request
import django
import os
import sys
import time
import json


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO


def get_inventory():
    response = request.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)

    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={"vin": automobile["vin"]},
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_inventory()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
