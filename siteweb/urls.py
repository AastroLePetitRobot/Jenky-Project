from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from . import views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from siteweb.views import *

urlpatterns = [
    url(r'^$', LoginView.as_view()),
    url(r'^logout/$', LogoutView.as_view()),
    url(r'^dashboard/$', login_required(IndexView.as_view())),
    url(r'^dashboard/monjenky/$', login_required(MonJenkyView.as_view())),

]
