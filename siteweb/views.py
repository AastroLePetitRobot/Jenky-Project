from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login, logout
from django.http import *
from django.conf import settings
from siteweb.models import Caracteristiques
from siteweb.models import Equipement
from siteweb.models import Objet

# Create your views here.
def index(request):
    return render(request, 'index.html')

class LoginView(TemplateView):

  template_name = 'index.html'

  def post(self, request, **kwargs):

    username = request.POST.get('username', False)
    password = request.POST.get('password', False)
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        login(request, user)
        return HttpResponseRedirect( settings.LOGIN_REDIRECT_URL )

    return render(request, self.template_name)


class LogoutView(TemplateView):

  template_name = 'index.html'

  def get(self, request, **kwargs):

    logout(request)

    return render(request, self.template_name)

class IndexView(TemplateView):
  template_name = "dashboard/index.html"
  def get(self, request, **kwargs):
    return render(request, self.template_name)

class MonJenkyView(TemplateView):
  template_name = "dashboard/monjenky.html"
  def get(self, request, **kwargs):
    cara = Caracteristiques.objects.get(id_id=request.user.id)
    obj = Equipement.objects.get(id_id=request.user.id)
    casque = Objet.objects.get(typeobjet=obj.casque)
    armure = Objet.objects.get(typeobjet=obj.armure)
    pantalon = Objet.objects.get(typeobjet=obj.pantalon)
    chaussures = Objet.objects.get(typeobjet=obj.chaussures)
    arme = Objet.objects.get(typeobjet=obj.arme)
    return render(request, self.template_name, {'cara' : cara, 'casque' : casque, 'armure' : armure, 'pantalon' : pantalon, 'chaussures' : chaussures, 'arme' : arme})