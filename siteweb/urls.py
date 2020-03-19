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
    url(r'^dashboard/$', IndexView.as_view()),
    # monjenky
    url(r'^dashboard/monjenky/$', MonJenkyView.as_view()),
    # api monjenky 
    url(r'^dashboard/monjenky/vendre/$', MonJenkyItemVendre.as_view()),
    url(r'^dashboard/monjenky/equip/$', MonJenkyItemEquip.as_view()),
    url(r'^dashboard/monjenky/desequip/arme/$', MonJenkyItemDesequipArme.as_view()),
    url(r'^dashboard/monjenky/desequip/casque/$', MonJenkyItemDesequipCasque.as_view()),
    url(r'^dashboard/monjenky/desequip/armure/$', MonJenkyItemDesequipArmure.as_view()),
    url(r'^dashboard/monjenky/desequip/pantalon/$', MonJenkyItemDesequipPantalon.as_view()),
    url(r'^dashboard/monjenky/desequip/chaussures/$', MonJenkyItemDesequipChaussures.as_view()),
    # profile
    url(r'^dashboard/profile/$', ProfileView.as_view()),
    # api profile
    url(r'^dashboard/profile/update/$', ProfileUpdate.as_view()),
    # shop
    url(r'^dashboard/shop/$', ShopView.as_view()),
    # api shop
    url(r'^dashboard/shop/update/$', ShopUpdate.as_view()),
    url(r'^dashboard/shop/to_inventaire/$', ShopEquip.as_view()),
    # arene
    url(r'^dashboard/arene/$', AreneView.as_view()),
    # api arene
    url(r'^dashboard/arene/historique/$', ApiInfoHistorique.as_view()),
    url(r'^dashboard/arene/fincombat/$', ApiResultArene.as_view()),
    url(r'^dashboard/arene/infouser/$', ApiInfoUser.as_view()),
    #prof
    url(r'^proflogin/$', LoginProfView.as_view()),
    url(r'^prof/$', ProfView.as_view()),
    #api prof
    url(r'^prof/api/$', ProfApi.as_view()),
    url(r'^dashboard/arene/chargecarac/$', ApiChargeSprite.as_view()),
]
