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

