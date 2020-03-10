from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Caracteristiques(models.Model):
    id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=True)
    niveau = models.IntegerField()
    gold = models.IntegerField()
    attaque = models.IntegerField()
    defense = models.IntegerField()
    vitesse = models.IntegerField()
    precision = models.IntegerField()
    effet = models.IntegerField()
    last_attack = models.DateTimeField()

class Objet(models.Model):
    nom = models.TextField()
    pd = models.IntegerField()
    pa = models.IntegerField()
    typeobjet = models.IntegerField()
    prix_achat = models.IntegerField()
    prix_vente = models.IntegerField()

class Equipement(models.Model):
    id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=True)
    casque = models.IntegerField()
    armure = models.IntegerField()
    pantalon = models.IntegerField()
    chaussures = models.IntegerField()
    arme = models.IntegerField()

class Inventaire(models.Model):
    idjoueur = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE)
    objet = models.IntegerField()

class Shop(models.Model):
    id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=True)
    objet0 = models.IntegerField()
    objet1 = models.IntegerField()
    objet2 = models.IntegerField()
    objet3 = models.IntegerField()
    objet4 = models.IntegerField()
    objet5 = models.IntegerField()
    dateupdate = models.DateTimeField()

class Combat(models.Model):
    joueur_attaque = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=False , related_name="joueur_attaque")
    joueur_defense = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=False , related_name="joueur_defense")
    gold_obtenu = models.IntegerField()
    date_attaque = models.DateTimeField()
    gagnant = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=False , related_name="joueur_gagnant") 

class Prof(models.Model):
    id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=True)
    nom = models.TextField()
    prenom = models.TextField()
    
class Module(models.Model):
    nom_module = models.TextField()
    
class Etudiant_TP(models.Model):
    nom_module = models.ForeignKey(Module, to_field='id', on_delete=models.CASCADE, primary_key=False)
    etudiant = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=False)

class Prof_TP(models.Model):
    nom_module = models.ForeignKey(Module, to_field='id', on_delete=models.CASCADE, primary_key=False)
    prof = models.ForeignKey(Prof, to_field='id', on_delete=models.CASCADE, primary_key=False)

class Competence_Module(models.Model):
    nom_module = models.ForeignKey(Module, to_field='id', on_delete=models.CASCADE, primary_key=False)
    nom_competence = models.TextField()
    nombre_exp_gagne = models.IntegerField()
    etudiant = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, primary_key=False)
    valide = models.BooleanField()
    