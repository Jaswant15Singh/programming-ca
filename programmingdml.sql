--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- pg_dump -U postgres -d programmingca -f "C:\Users\singh\Downloads\programming.sql"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_def (
    admin_id integer NOT NULL,
    admin_name character(50),
    admin_address text,
    admin_email character varying(100),
    admin_contact character varying(15),
    created_date timestamp with time zone,
    login_username character varying(30),
    password text
);


ALTER TABLE public.admin_def OWNER TO postgres;

--
-- Name: admin_def_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_def_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_def_admin_id_seq OWNER TO postgres;

--
-- Name: admin_def_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_def_admin_id_seq OWNED BY public.admin_def.admin_id;


--
-- Name: comment_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment_likes (
    like_id integer NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL,
    liked_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.comment_likes OWNER TO postgres;

--
-- Name: comment_likes_like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_likes_like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_likes_like_id_seq OWNER TO postgres;

--
-- Name: comment_likes_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_likes_like_id_seq OWNED BY public.comment_likes.like_id;


--
-- Name: comments_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_def (
    comment_id integer NOT NULL,
    complaint_id integer,
    comment text,
    comment_date timestamp with time zone,
    updated_date timestamp with time zone,
    user_id integer
);


ALTER TABLE public.comments_def OWNER TO postgres;

--
-- Name: comments_def_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_def_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_def_comment_id_seq OWNER TO postgres;

--
-- Name: comments_def_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_def_comment_id_seq OWNED BY public.comments_def.comment_id;


--
-- Name: complaint_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaint_def (
    complaint_id integer NOT NULL,
    user_id integer,
    complaint character varying,
    complaint_images text[],
    status character varying,
    complaint_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    assigned_officer integer,
    complaint_address character varying,
    zone_name integer
);


ALTER TABLE public.complaint_def OWNER TO postgres;

--
-- Name: complaint_def_complaint_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complaint_def_complaint_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complaint_def_complaint_id_seq OWNER TO postgres;

--
-- Name: complaint_def_complaint_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complaint_def_complaint_id_seq OWNED BY public.complaint_def.complaint_id;


--
-- Name: officer_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.officer_def (
    officer_id integer NOT NULL,
    officer_name text,
    officer_address text,
    officer_email character varying(100),
    officer_contact character varying(15),
    created_date timestamp with time zone,
    login_username character varying(30),
    password text
);


ALTER TABLE public.officer_def OWNER TO postgres;

--
-- Name: officer_def_officer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.officer_def_officer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.officer_def_officer_id_seq OWNER TO postgres;

--
-- Name: officer_def_officer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.officer_def_officer_id_seq OWNED BY public.officer_def.officer_id;


--
-- Name: users_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_def (
    user_id integer NOT NULL,
    user_name character varying,
    user_address text,
    user_email character varying,
    user_contact character varying,
    created_date timestamp with time zone,
    login_username character varying,
    password text
);


ALTER TABLE public.users_def OWNER TO postgres;

--
-- Name: users_def_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_def_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_def_user_id_seq OWNER TO postgres;

--
-- Name: users_def_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_def_user_id_seq OWNED BY public.users_def.user_id;


--
-- Name: zones_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zones_def (
    zone_id integer NOT NULL,
    zone_name text,
    created_date timestamp with time zone,
    updated_date timestamp with time zone
);


ALTER TABLE public.zones_def OWNER TO postgres;

--
-- Name: zones_def_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zones_def_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zones_def_zone_id_seq OWNER TO postgres;

--
-- Name: zones_def_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zones_def_zone_id_seq OWNED BY public.zones_def.zone_id;


--
-- Name: admin_def admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_def ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_def_admin_id_seq'::regclass);


--
-- Name: comment_likes like_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_likes ALTER COLUMN like_id SET DEFAULT nextval('public.comment_likes_like_id_seq'::regclass);


--
-- Name: comments_def comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_def ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_def_comment_id_seq'::regclass);


--
-- Name: complaint_def complaint_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaint_def ALTER COLUMN complaint_id SET DEFAULT nextval('public.complaint_def_complaint_id_seq'::regclass);


--
-- Name: officer_def officer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.officer_def ALTER COLUMN officer_id SET DEFAULT nextval('public.officer_def_officer_id_seq'::regclass);


--
-- Name: users_def user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_def ALTER COLUMN user_id SET DEFAULT nextval('public.users_def_user_id_seq'::regclass);


--
-- Name: zones_def zone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones_def ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_def_zone_id_seq'::regclass);


--
-- Data for Name: admin_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_def (admin_id, admin_name, admin_address, admin_email, admin_contact, created_date, login_username, password) FROM stdin;
1	admin                                             	Dublin 02	dummy admin_email.com	9703195828	2025-11-17 17:26:29.267223+05:30	admin	$2b$10$pk3izOhZ35EVUemDwwjmcORXQiPRUit7isOCaQIhlON0NH5E2Vj1C
\.


--
-- Data for Name: comment_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment_likes (like_id, comment_id, user_id, liked_at) FROM stdin;
\.


--
-- Data for Name: comments_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments_def (comment_id, complaint_id, comment, comment_date, updated_date, user_id) FROM stdin;
\.


--
-- Data for Name: complaint_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaint_def (complaint_id, user_id, complaint, complaint_images, status, complaint_date, assigned_officer, complaint_address, zone_name) FROM stdin;
8	4	Jaswant test	{"public\\\\uploads\\\\complaints\\\\complaint_images-1764691511845.png","public\\\\uploads\\\\complaints\\\\complaint_images-1764691511869.png"}	resolved	2025-12-02 21:35:11.993071	2	Bandra	2
10	5	Dudu fudu	{"public\\\\uploads\\\\complaints\\\\complaint_images-1764802049307.jpeg"}	resolved	2025-12-04 04:17:29.409699	2	Vasai	5
9	5	dudu masti karta haio	{"public\\\\uploads\\\\complaints\\\\complaint_images-1764801679502.jpeg","public\\\\uploads\\\\complaints\\\\complaint_images-1764801679503.jpg"}	resolved	2025-12-04 04:11:19.714992	2	Mira	6
11	5	cui	{"public\\\\uploads\\\\complaints\\\\complaint_images-1764802069882.jpeg"}	resolved	2025-12-04 04:17:50.007289	2	anaa	1
12	5	Testing complaints	{"public\\\\uploads\\\\complaints\\\\complaint_images-1764878064370.jpg","public\\\\uploads\\\\complaints\\\\complaint_images-1764878064377.png","public\\\\uploads\\\\complaints\\\\complaint_images-1764878064378.png","public\\\\uploads\\\\complaints\\\\complaint_images-1764878064387.webp"}	resolved	2025-12-05 01:24:24.479704	4	ajajaja	1
\.


--
-- Data for Name: officer_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.officer_def (officer_id, officer_name, officer_address, officer_email, officer_contact, created_date, login_username, password) FROM stdin;
3	swcqwscqabbcbc	KALASAHEB TABELA, KADESHWARI MANDIR,MOUNT MARY,BANDRA(W)	singhjaswant0932@gmail.com	9920174667	2025-11-28 17:37:20.672873+05:30	PRATIMA	$2b$10$35jXPOqrACMHZJnZMSGrSu/jLvxH6w6QK.PmG/L3DaWTdMKq5A35a
1	officer 12	Dublin 120	officer@gmail.com	9167229331	2025-11-17 18:45:42.116823+05:30	officer1	$2b$10$RYDlp374bZnJ8t3bQ0me9et7s/XZ24wnO3xvXS9nTGlRZPzENZ2TK
2	Jaswant Abhay Singh	120 Lock Place,Magee Quarter	singhjaswant0932@gmail.com	9167229331	2025-11-27 19:36:48.473989+05:30	Jaswant	$2b$10$NDDAxqpoJ0.OX/E6OBcL0uXnam.M5byhzo8wjqaKg2dBlrW1GOjq2
5	Jaswant Singh haha	Mount Mary Road\nKalasaheb Tabela	singhjaswant0932@gmail.com	850682899	2025-12-05 01:27:28.697774+05:30	Jas	$2b$10$UvjrH2lSrxnxyK43HE1sYe6FeHpm3LWT3kpJzCo7A2Swf60PRXbyG
4	Pratimas	Pratima	Pratima@gmail.com	1234567890	2025-12-02 16:04:17.827682+05:30	Pratima	$2b$10$gO63T8i8Hnekn5Tb.iJcAOoMUBXDel7cU8mSIAkc9rlUpx1/LO06i
6	trial	trial	trial@gmail.com	7037185994	2025-12-05 01:28:59.331963+05:30	trial	$2b$10$KbPQeC7k4/B.XzAQaV/xFeHRcc4WkxcMxAMxL97Y/sYsAzfgUDs6q
\.


--
-- Data for Name: users_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_def (user_id, user_name, user_address, user_email, user_contact, created_date, login_username, password) FROM stdin;
4	Jaswant Abhay Singh	120 Lock Place,Magee Quarter,Kildare\n	singhjaswant0932@gmail.com	7506986337	2025-11-25 21:43:43.767855+05:30	Jaswant	$2b$10$weaHvA6XJSldDIki3UiJAeo.PCUjawQT2VPvodoxl8h4CMj20kEN6
6	jas	KALASAHEB TABELA, KADESHWARI MANDIR,MOUNT MARY,BANDRA(W)	singhjaswant0932@gmail.com	9167229331	2025-12-05 00:59:55.04583+05:30	jas	$2b$10$qgBPUNW/aDZr/1lMhJWZUut2vt4VxSbDJge7bjCVJaHbIHXpkyw/a
5	Yogita Jaswant Singh	Mumbai,India	singhjaswant0932@gmail.com	7506986337	2025-11-25 21:44:18.868121+05:30	Yogita	$2b$10$pGWtfoKo/VVJoYgUsc24auHi4uwRRzPtatOH5fSvc0QcS1dzwN1GG
\.


--
-- Data for Name: zones_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zones_def (zone_id, zone_name, created_date, updated_date) FROM stdin;
3	new	2025-11-27 18:59:22.712588+05:30	\N
1	Zone Uno	2025-11-17 19:01:30.10702+05:30	2025-11-28 17:57:43.30045+05:30
4	pehle	2025-11-28 17:48:29.012907+05:30	2025-11-28 18:01:44.138054+05:30
5	do	2025-11-28 18:07:05.14687+05:30	2025-11-28 18:08:27.95249+05:30
6	ahahaa	2025-11-28 18:08:34.442592+05:30	\N
2	testing zone	2025-11-27 18:50:30.639893+05:30	2025-12-03 14:36:03.90726+05:30
7	dublin 12	2025-12-05 01:26:54.081453+05:30	2025-12-05 01:27:02.002566+05:30
\.


--
-- Name: admin_def_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_def_admin_id_seq', 1, true);


--
-- Name: comment_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_likes_like_id_seq', 1, false);


--
-- Name: comments_def_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_def_comment_id_seq', 1, false);


--
-- Name: complaint_def_complaint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.complaint_def_complaint_id_seq', 12, true);


--
-- Name: officer_def_officer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.officer_def_officer_id_seq', 6, true);


--
-- Name: users_def_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_def_user_id_seq', 6, true);


--
-- Name: zones_def_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zones_def_zone_id_seq', 7, true);


--
-- Name: admin_def admin_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_def
    ADD CONSTRAINT admin_def_pkey PRIMARY KEY (admin_id);


--
-- Name: comment_likes comment_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT comment_likes_pkey PRIMARY KEY (like_id);


--
-- Name: comments_def comments_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_def
    ADD CONSTRAINT comments_def_pkey PRIMARY KEY (comment_id);


--
-- Name: complaint_def complaint_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaint_def
    ADD CONSTRAINT complaint_def_pkey PRIMARY KEY (complaint_id);


--
-- Name: officer_def officer_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.officer_def
    ADD CONSTRAINT officer_def_pkey PRIMARY KEY (officer_id);


--
-- Name: comment_likes unique_like; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT unique_like UNIQUE (comment_id, user_id);


--
-- Name: users_def users_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_def
    ADD CONSTRAINT users_def_pkey PRIMARY KEY (user_id);


--
-- Name: zones_def zones_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones_def
    ADD CONSTRAINT zones_def_pkey PRIMARY KEY (zone_id);


--
-- Name: comments_def comments_def_complaint_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_def
    ADD CONSTRAINT comments_def_complaint_id_fkey FOREIGN KEY (complaint_id) REFERENCES public.complaint_def(complaint_id);


--
-- Name: complaint_def fk_assigned_officer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaint_def
    ADD CONSTRAINT fk_assigned_officer FOREIGN KEY (assigned_officer) REFERENCES public.officer_def(officer_id);


--
-- Name: comment_likes fk_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES public.comments_def(comment_id);


--
-- Name: comments_def user_comment_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_def
    ADD CONSTRAINT user_comment_fk FOREIGN KEY (user_id) REFERENCES public.users_def(user_id);


--
-- Name: complaint_def zone_fk_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaint_def
    ADD CONSTRAINT zone_fk_key FOREIGN KEY (zone_name) REFERENCES public.zones_def(zone_id);


--
-- PostgreSQL database dump complete
--

