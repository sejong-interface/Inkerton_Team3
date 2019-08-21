from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='mainpage'),
]

nuguurls = [
    path('answer.schedule',views.nuguReq),
]

urlpatterns+=nuguurls