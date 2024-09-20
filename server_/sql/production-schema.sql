drop database if exists anime_voyager;
create database anime_voyager;
use anime_voyager;

create table users(
	username varchar(50) not null primary key,
	password varchar(500) not null,
	enabled boolean not null
);

create table authorities (
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username),
	constraint uq_authorities unique(username, authority)
);

create table favorites (
    favorite_id int auto_increment primary key,
    username varchar(50) not null,
    anime_id int not null,
    constraint fk_favorites_users foreign key(username) references users(username),
    constraint uq_favorites unique(username, anime_id)
);

create table watch_list (
    watch_list_id int auto_increment primary key,
    username varchar(50) not null,
    anime_id int not null,
    constraint fk_watch_list_users foreign key(username) references users(username),
    constraint uq_watch_list unique(username, anime_id)
);

create table current_watch_list (
    current_watch_list_id int auto_increment primary key,
    username varchar(50) not null,
    anime_id int not null,
    constraint fk_current_watch_list_users foreign key(username) references users(username),
    constraint uq_current_watch_list unique(username, anime_id)
);

create table plan_to_watch_list (
    plan_to_watch_list_id int auto_increment primary key,
    username varchar(50) not null,
    anime_id int not null,
    constraint fk_plan_to_watch_list_users foreign key(username) references users(username),
    constraint uq_plan_to_watch_list unique(username, anime_id)
);

