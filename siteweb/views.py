from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login, logout
from django.http import *
from django.conf import settings
from siteweb.models import Caracteristiques
from siteweb.models import Equipement
from siteweb.models import Objet
from siteweb.models import Inventaire
from django.db.models import Value
from django.db.models.functions import Replace
from django.contrib.auth.models import User

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
    idinv = Inventaire.objects.filter(idjoueur_id=request.user.id)
    inv = Objet.objects.filter(id__in = [objet.objet for objet in idinv] )
    return render(request, self.template_name, {'cara' : cara, 'casque' : casque, 'armure' : armure, 'pantalon' : pantalon, 'chaussures' : chaussures, 'arme' : arme , 'inv' : inv, 'idinv' : idinv})

class MonJenkyItemDelete(TemplateView):
  def post(self, request, **kwargs): # Ici pas de vérification à faire
    Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    print(request.POST.get('item'))
    return HttpResponseRedirect('/dashboard/monjenky/#inventaire');

class MonJenkyItemEquip(TemplateView):
  def post(self, request, **kwargs): # Vérification si l'user n'a pas déjà un item équipé sur lui
    inv = Inventaire.objects.get(idjoueur_id=request.user.id, objet=request.POST.get('item')) # on fetch l'item qui veut equiper
    typeobjet = Objet.objects.get(id=inv.objet).typeobjet
    stuff = Equipement.objects.get(id_id = request.user.id) # recupère le stuff du joueur
    if typeobjet == 0 : # si c'est une épée
      if not (stuff.arme >= 0): # on peut ajouter l'arme
        Equipement.objects.filter(id_id = request.user.id).update(arme=inv.objet)
        Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    elif typeobjet == 1 : # si c'est un casque
      if not (stuff.casque >= 0):
        Equipement.objects.filter(id_id = request.user.id).update(casque=inv.objet)
        Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    elif typeobjet == 2 : # si c'est une armure
      if not (stuff.armure >= 0):
        Equipement.objects.filter(id_id = request.user.id).update(armure=inv.objet)
        Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    elif typeobjet == 3 : # si c'est un pantalon
      if not (stuff.pantalon >= 0):
        Equipement.objects.filter(id_id = request.user.id).update(pantalon=inv.objet)
        Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    elif typeobjet == 4 : # si c'est des chaussures
      if not (stuff.chaussures >= 0):
        Equipement.objects.filter(id_id = request.user.id).update(chaussures=inv.objet)
        Inventaire.objects.filter(objet = request.POST.get('item'), idjoueur_id=request.user.id).delete()
    else: 
      print("Erreur")
    return HttpResponseRedirect('/dashboard/monjenky/#inventaire');

class MonJenkyItemDesequipArme(TemplateView):
  def post(self, request, **kwargs):
    print(request.POST.get('arme'))
    if request.POST.get('arme') != '-1':
      Equipement.objects.filter().update(arme=-1)
      Inventaire.objects.create(objet=request.POST.get('arme'), idjoueur_id=request.user.id)
      return HttpResponseRedirect('/dashboard/monjenky/#')

class MonJenkyItemDesequipCasque(TemplateView):
  def post(self, request, **kwargs):
    print(request.POST.get('casque'))
    if request.POST.get('casque') != '-1':
      Equipement.objects.filter().update(casque=-1)
      Inventaire.objects.create(objet=request.POST.get('casque'), idjoueur_id=request.user.id)
    return HttpResponseRedirect('/dashboard/monjenky/#')

class MonJenkyItemDesequipArmure(TemplateView):
  def post(self, request, **kwargs):
    print(request.POST.get('armure'))
    if request.POST.get('armure') != '-1':
      Equipement.objects.filter().update(armure=-1)
      Inventaire.objects.create(objet=request.POST.get('armure'), idjoueur_id=request.user.id)
    return HttpResponseRedirect('/dashboard/monjenky/#')

class MonJenkyItemDesequipPantalon(TemplateView):
  def post(self, request, **kwargs):
    print(request.POST.get('pantalon'))
    if request.POST.get('pantalon') != '-1':
      Equipement.objects.filter().update(pantalon=-1)
      Inventaire.objects.create(objet=request.POST.get('pantalon'), idjoueur_id=request.user.id)
    return HttpResponseRedirect('/dashboard/monjenky/#')

class MonJenkyItemDesequipChaussures(TemplateView):
  def post(self, request, **kwargs):
    print(request.POST.get('chaussures'))
    if request.POST.get('chaussures') != '-1':
      Equipement.objects.filter().update(chaussures=-1)
      Inventaire.objects.create(objet=request.POST.get('chaussures'), idjoueur_id=request.user.id)
    return HttpResponseRedirect('/dashboard/monjenky/#')
    
class ProfileView(TemplateView):
  template_name = 'dashboard/profile.html'
  def get(self, request, **kwargs):
    return render(request, self.template_name)

class ProfileUpdate(TemplateView):
  def post(self, request, **kwargs):
    if request.POST.get('ln') != '' and request.POST.get('fn') != '' and request.POST.get('mdpactuel') != ''  and request.POST.get('mail') != '': # si la requete n'est pas nulle
      if(request.user.check_password(request.POST.get('mdpactuel'))):
        User.objects.filter(id=request.user.id).update(email = request.POST.get('mail'), first_name = request.POST.get('fn'), last_name = request.POST.get('ln'))
        if(request.POST.get('mdpnouveau') != ''):
          request.user.set_password(request.POST.get('mdpnouveau'))
          request.user.save()
      else:
        print("Mauvais mdp")
    else:
      print("nul")
    return HttpResponseRedirect('/dashboard/profile/')


  