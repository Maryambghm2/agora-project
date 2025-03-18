--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: maryam
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO maryam;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: maryam
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO maryam;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.articles (
    id_article integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    creation_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modification_date timestamp(3) without time zone,
    "userId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public.articles OWNER TO maryam;

--
-- Name: articles_id_article_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.articles_id_article_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_article_seq OWNER TO maryam;

--
-- Name: articles_id_article_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.articles_id_article_seq OWNED BY public.articles.id_article;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.categories (
    id_category integer NOT NULL,
    name text NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.categories OWNER TO maryam;

--
-- Name: categories_id_category_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.categories_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_category_seq OWNER TO maryam;

--
-- Name: categories_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.categories_id_category_seq OWNED BY public.categories.id_category;


--
-- Name: collection; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.collection (
    "articleId" integer NOT NULL,
    id_collection integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.collection OWNER TO maryam;

--
-- Name: collection_id_collection_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.collection_id_collection_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collection_id_collection_seq OWNER TO maryam;

--
-- Name: collection_id_collection_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.collection_id_collection_seq OWNED BY public.collection.id_collection;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.comments (
    id_comment integer NOT NULL,
    content text NOT NULL,
    creation_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "articleId" integer NOT NULL
);


ALTER TABLE public.comments OWNER TO maryam;

--
-- Name: comments_id_comment_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.comments_id_comment_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_comment_seq OWNER TO maryam;

--
-- Name: comments_id_comment_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.comments_id_comment_seq OWNED BY public.comments.id_comment;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.likes (
    id_like integer NOT NULL,
    like_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "articleId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.likes OWNER TO maryam;

--
-- Name: likes_id_like_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.likes_id_like_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_like_seq OWNER TO maryam;

--
-- Name: likes_id_like_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.likes_id_like_seq OWNED BY public.likes.id_like;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.notifications (
    id_notification integer NOT NULL,
    type text NOT NULL,
    message text,
    notification_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    read_status boolean DEFAULT false NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.notifications OWNER TO maryam;

--
-- Name: notifications_id_notification_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.notifications_id_notification_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_notification_seq OWNER TO maryam;

--
-- Name: notifications_id_notification_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.notifications_id_notification_seq OWNED BY public.notifications.id_notification;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.permissions (
    id_permission integer NOT NULL,
    name text NOT NULL,
    write_permission boolean NOT NULL,
    read_permission boolean NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public.permissions OWNER TO maryam;

--
-- Name: permissions_id_permission_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.permissions_id_permission_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_permission_seq OWNER TO maryam;

--
-- Name: permissions_id_permission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.permissions_id_permission_seq OWNED BY public.permissions.id_permission;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.roles (
    id_role integer NOT NULL,
    name text DEFAULT 'Utilisateur'::text NOT NULL
);


ALTER TABLE public.roles OWNER TO maryam;

--
-- Name: roles_id_role_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.roles_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_role_seq OWNER TO maryam;

--
-- Name: roles_id_role_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.roles_id_role_seq OWNED BY public.roles.id_role;


--
-- Name: users; Type: TABLE; Schema: public; Owner: maryam
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    username text NOT NULL,
    bio text,
    mail text NOT NULL,
    password text NOT NULL,
    "roleId" integer NOT NULL,
    "collectionId" integer
);


ALTER TABLE public.users OWNER TO maryam;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: maryam
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO maryam;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: maryam
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: articles id_article; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.articles ALTER COLUMN id_article SET DEFAULT nextval('public.articles_id_article_seq'::regclass);


--
-- Name: categories id_category; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.categories ALTER COLUMN id_category SET DEFAULT nextval('public.categories_id_category_seq'::regclass);


--
-- Name: collection id_collection; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.collection ALTER COLUMN id_collection SET DEFAULT nextval('public.collection_id_collection_seq'::regclass);


--
-- Name: comments id_comment; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.comments ALTER COLUMN id_comment SET DEFAULT nextval('public.comments_id_comment_seq'::regclass);


--
-- Name: likes id_like; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.likes ALTER COLUMN id_like SET DEFAULT nextval('public.likes_id_like_seq'::regclass);


--
-- Name: notifications id_notification; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id_notification SET DEFAULT nextval('public.notifications_id_notification_seq'::regclass);


--
-- Name: permissions id_permission; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id_permission SET DEFAULT nextval('public.permissions_id_permission_seq'::regclass);


--
-- Name: roles id_role; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_role SET DEFAULT nextval('public.roles_id_role_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
71044a62-8d56-4603-b82b-05cbfb64ee70	5b0a3a2a26b48b03676253687d8816a5bc73e3280cf3ec76ad8563ef613ede6c	2025-03-18 10:27:36.656052+00	20250313142559_update_schema	\N	\N	2025-03-18 10:27:36.501927+00	1
5c24ac34-e127-40e3-bee5-7f8a9865eed7	ab0f24d03c7e62a961a5ac1119e93df377842d14ae5c655f7dc4909e3a8dd8a9	2025-03-18 10:27:36.679407+00	20250315133201_modification_schema	\N	\N	2025-03-18 10:27:36.660931+00	1
d67644f8-9218-4b07-975d-62f6df3b1dc6	f01008ed769de60db1c193e87a984a59f7be70b0dd886fcda6aeb81a1f15b1df	2025-03-18 10:27:36.698034+00	20250315150204_modification_schema	\N	\N	2025-03-18 10:27:36.683873+00	1
c2b14f02-a34e-4861-acc1-d968d9286d24	5b1a1687797c65419898c4d497617907c91c0f9292bb4370bbd2270f6572a604	2025-03-18 10:27:36.716986+00	20250315223305_modification_schema	\N	\N	2025-03-18 10:27:36.703489+00	1
fe0fd44d-2c78-402b-a54d-7a713d95b8d0	8aa24eaf4e561cd59c3b14387cd8baa057ecb2d979313d807bbc3a024b8491bf	2025-03-18 10:27:36.738147+00	20250316172848_modification_schema	\N	\N	2025-03-18 10:27:36.721934+00	1
f2d7c6e5-c05f-4962-b372-991c068c0959	a5bfa431747bb8728cb302cf1222995e82e88ef5c27a528a623280f500fdc524	2025-03-18 10:27:36.763632+00	20250317084915_modification_schema	\N	\N	2025-03-18 10:27:36.743109+00	1
30e3636a-dbb3-4031-8e11-d40c328b1d01	e5aa1999c8de7eb434fae62d967ed0d88a98c10ed33eadee94b84f5fe0bc37aa	2025-03-18 10:27:36.784225+00	20250317091651_modification_schema	\N	\N	2025-03-18 10:27:36.7686+00	1
086aa21f-33b4-45f7-a0ab-12edde2deb5c	e4a8cf3d1873e77fd764aa75c6f5752f841566ec3c382e4bba4a2fc01c01df7f	2025-03-18 10:27:36.811579+00	20250317100003_new	\N	\N	2025-03-18 10:27:36.789116+00	1
e769e1da-6f09-4fec-a336-96cba88ee430	ca23e77ef60c551d0f0830a8672ae389885c8686a3e9977a135dd1d58d3869a9	2025-03-18 10:27:36.827491+00	20250317101001_modification_schema	\N	\N	2025-03-18 10:27:36.815669+00	1
70be94b0-6e5d-46a6-a0de-f4fc7fe23f58	e400723016c615f49c2f38b3da8f1d85f107287513670f474a08536d2df8e73b	2025-03-18 10:27:58.195408+00	20250318102758_modification_schema	\N	\N	2025-03-18 10:27:58.182651+00	1
241691e5-9cea-4a39-a131-07d33661aebe	ca23e77ef60c551d0f0830a8672ae389885c8686a3e9977a135dd1d58d3869a9	2025-03-18 10:41:37.316892+00	20250318104137_modification_schema	\N	\N	2025-03-18 10:41:37.300111+00	1
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.articles (id_article, title, content, creation_date, modification_date, "userId", "categoryId") FROM stdin;
1	Capteurs IoT et r?�seaux	Probl?�me de communication avec mes capteurs	2025-03-18 10:55:59.877	\N	2	10
2	Erreur 500 sur mon API	Mon API Express renvoie une erreur 500 sans aucun message explicite. J���ai activ?� les logs en mode debug, mais je ne parviens pas ?� identifier la source du probl?�me. J���utilise PostgreSQL comme base de donn?�es et Sequelize pour l���ORM. Mon endpoint `/articles` fonctionne bien en local, mais plante en production. Une id?�e de ce qui pourrait causer ce souci ?	2025-03-18 13:13:41.815	\N	3	3
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.categories (id_category, name, "userId") FROM stdin;
1	R?�seaux	2
2	D?�veloppement Web	2
3	Cybers?�curit?�	2
4	Cloud Computing	2
5	Intelligence Artificielle	2
6	Bases de Donn?�es	2
7	D?�veloppement Mobile	2
8	Syst?�mes d���Exploitation	2
9	DevOps	2
10	IoT	2
\.


--
-- Data for Name: collection; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.collection ("articleId", id_collection, "userId") FROM stdin;
1	1	2
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.comments (id_comment, content, creation_date, "userId", "articleId") FROM stdin;
1	Up	2025-03-18 12:20:21.84	2	1
2	V?�rifiez si vos capteurs IoT sont correctement connect?�s au r?�seau local et si l���adresse IP du serveur est correcte.	2025-03-18 13:14:10.669	3	1
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.likes (id_like, like_date, "articleId", "userId") FROM stdin;
1	2025-03-18 12:38:16.165	1	2
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.notifications (id_notification, type, message, notification_date, read_status, "userId") FROM stdin;
1	comment	Vous avez re?�u un nouveau commentaire sur votre article Capteurs IoT et r?�seaux.	2025-03-18 13:14:10.709	t	2
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.permissions (id_permission, name, write_permission, read_permission, "roleId") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.roles (id_role, name) FROM stdin;
1	Administrateur
2	Utilisateur
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: maryam
--

COPY public.users (id_user, username, bio, mail, password, "roleId", "collectionId") FROM stdin;
2	mbydev2	\N	mbydev2@gmail.com	$2b$10$z31sydUX0h4iD9L.rxNGbuhD40zPh8KqA8LWnyrcG6NYGYWHoLUOG	1	\N
3	alice_brown	\N	alice@example.com	$2b$10$VzFsEPGqLTCF/DR3sfihtOnHHZHU4CPSOcmPLkVA7UPyxLq0tEOa2	2	\N
\.


--
-- Name: articles_id_article_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.articles_id_article_seq', 2, true);


--
-- Name: categories_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.categories_id_category_seq', 10, true);


--
-- Name: collection_id_collection_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.collection_id_collection_seq', 1, true);


--
-- Name: comments_id_comment_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.comments_id_comment_seq', 2, true);


--
-- Name: likes_id_like_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.likes_id_like_seq', 1, true);


--
-- Name: notifications_id_notification_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.notifications_id_notification_seq', 1, true);


--
-- Name: permissions_id_permission_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.permissions_id_permission_seq', 1, false);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.roles_id_role_seq', 2, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: maryam
--

SELECT pg_catalog.setval('public.users_id_user_seq', 3, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id_article);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_category);


--
-- Name: collection collection_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT collection_pkey PRIMARY KEY (id_collection);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id_comment);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id_like);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id_notification);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id_permission);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: categories_name_key; Type: INDEX; Schema: public; Owner: maryam
--

CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


--
-- Name: permissions_name_key; Type: INDEX; Schema: public; Owner: maryam
--

CREATE UNIQUE INDEX permissions_name_key ON public.permissions USING btree (name);


--
-- Name: roles_name_key; Type: INDEX; Schema: public; Owner: maryam
--

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);


--
-- Name: users_mail_key; Type: INDEX; Schema: public; Owner: maryam
--

CREATE UNIQUE INDEX users_mail_key ON public.users USING btree (mail);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: maryam
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: articles articles_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id_category) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: articles articles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: categories categories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: collection collection_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT "collection_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id_article) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: collection collection_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT "collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id_article) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: likes likes_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id_article) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: permissions permissions_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id_role) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maryam
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id_role) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: maryam
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

