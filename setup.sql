insert into siteweb_equipement values(1,-1,-1,-1,-1,-1);
insert into siteweb_objet values(-1,'empty',0,0,-1,0,0);
insert into siteweb_objet values(0,'epee-t3',0,12,0,40,20);
insert into siteweb_objet values(1,'casque-t3',5,10,1,40,20);
insert into siteweb_objet values(2,'plastron-t3',12,0,2,40,20);
insert into siteweb_objet values(3,'jambiere-t3',5,0,3,40,20);
insert into siteweb_objet values(4,'bottes-t3',5,10,4,40,20);

insert into siteweb_objet values(5,'epee-t2',0,10,0,20,10);
insert into siteweb_objet values(6,'casque-t2',4,8,1,20,10);
insert into siteweb_objet values(7,'plastron-t2',10,0,2,20,10);
insert into siteweb_objet values(8,'jambiere-t2',7,0,3,20,10);
insert into siteweb_objet values(9,'bottes-t2',4,10,4,20,10);

insert into siteweb_objet values(10,'epee-t1',0,8,0,10,5);
insert into siteweb_objet values(11,'casque-t1',3,6,1,10,5);
insert into siteweb_objet values(12,'plastron-t1',8,0,2,10,5);
insert into siteweb_objet values(13,'jambiere-t1',5,0,3,10,5);
insert into siteweb_objet values(14,'bottes-t1',3,10,4,10,5);

insert into siteweb_caracteristiques values(1,50,100,0,0,100,100,0,'2020-01-01');
insert into siteweb_inventaire(objet,idjoueur_id) values (4,1);
insert into siteweb_inventaire(objet,idjoueur_id) values (0,1);
insert into siteweb_inventaire(objet,idjoueur_id) values (2,1);
alter table siteweb_inventaire add constraint cle_unique UNIQUE(objet,idjoueur_id);
insert into siteweb_shop values(1,0,1,2,3,4,3,CURRENT_TIMESTAMP);
