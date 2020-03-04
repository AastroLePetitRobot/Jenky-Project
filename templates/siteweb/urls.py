from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from . import views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from siteweb.views import *

urlpatterns = [
    # index
    url(r'^$', LoginView.as_view()),
    # api logout
    url(r'^logout/$', LogoutView.as_view()),
    # dashboard
    url(r'^dashboard/$', login_required(IndexView.as_view())),
    # monjenky
    url(r'^dashboard/monjenky/$', login_required(MonJenkyView.as_view())),
    # api monjenky 
    url(r'^dashboard/monjenky/vendre/$', login_required(MonJenkyItemVendre.as_view())),
    url(r'^dashboard/monjenky/equip/$', login_required(MonJenkyItemEquip.as_view())),
    url(r'^dashboard/monjenky/desequip/arme/$', login_required(MonJenkyItemDesequipArme.as_view())),
    url(r'^dashboard/monjenky/desequip/casque/$', login_required(MonJenkyItemDesequipCasque.as_view())),
    url(r'^dashboard/monjenky/desequip/armure/$', login_required(MonJenkyItemDesequipArmure.as_view())),
    url(r'^dashboard/monjenky/desequip/pantalon/$', login_required(MonJenkyItemDesequipPantalon.as_view())),
    url(r'^dashboard/monjenky/desequip/chaussures/$', login_required(MonJenkyItemDesequipChaussures.as_view())),
    # profile
    url(r'^dashboard/profile/$', login_required(ProfileView.as_view())),
    # api profile
    url(r'^dashboard/profile/update/$', login_required(ProfileUpdate.as_view())),
    # shop
    url(r'^dashboard/shop/$', login_required(ShopView.as_view())),
    # api shop
    url(r'^dashboard/shop/update/$', login_required(ShopUpdate.as_view())),
    url(r'^dashboard/shop/to_inventaire/$', login_required(ShopEquip.as_view())),
    # objectifs

    # api objectifs
    
    # arene
    url(r'^dashboard/arene/$', login_required(AreneView.as_view())),
    # api arene

    url(r'^dashboard/arene/infouser/$', login_required(ApiInfoUser.as_view())),
]
