from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Schedule,Error
from django.utils import timezone


def home(request):
    objects = Schedule.objects.filter(start_time__month=timezone.now().month)
    cnt = len(objects)
    print(objects)

    return render(request, 'home.html', {'objects':objects, 'cnt':cnt})

#NUGU API
@csrf_exempt
def nuguReq(request):
    body = request.body.decode("utf-8")#46
    # e = Error(log='trying: ' + body)
    # e.save()
    n = body.find('"schedule":{')+11
    while body[n:n+9]!='"value":"':
        n+=1
    n+=9
    n2=n
    while body[n2]!='"':
        n2+=1
    t=body[n:n2]
    # print('NUGU JSON REQUEST:',t)
    try:
        schedule = Schedule.objects.get(title=t)
        # e = Error(log='success: '+body)
        # e.save()
    except Exception :
        # e = Error(log='failed: '+body)
        # e.save()
        return render(request, 'home.html')
    date = schedule.getDate()
    return JsonResponse({
        "version": "2.0",
        "resultCode": "OK",
        "output": {
            "schedule":t,
            "date":date
        }
    })