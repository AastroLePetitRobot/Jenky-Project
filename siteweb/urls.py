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
    url(r'^dashboard/monjenky/suppr/$', login_required(MonJenkyItemDelete.as_view())),
    url(r'^dashboard/monjenky/equip/$', login_required(MonJenkyItemEquip.as_view())),
    url(r'^dashboard/monjenky/desequip/arme/$', login_required(MonJenkyItemDesequipArme.as_view())),
    url(r'^dashboard/monjenky/desequip/casque/$', login_required(MonJenkyItemDesequipCasque.as_view())),
    url(r'^dashboard/monjenky/desequip/armure/$', login_required(MonJenkyItemDesequipArmure.as_view())),
    url(r'^dashboard/monjenky/desequip/pantalon/$', login_required(MonJenkyItemDesequipPantalon.as_view())),
    url(r'^dashboard/monjenky/desequip/chaussures/$', login_required(MonJenkyItemDesequipChaussures.as_view())),
    url(r'^dashboard/profile/$', login_required(ProfileView.as_view())),
    url(r'^dashboard/profile/update/$', login_required(ProfileUpdate.as_view()))
]
