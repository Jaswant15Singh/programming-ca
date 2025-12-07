--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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


-- insert into public.admin_def values(
--     1,'admin','Dublin','admin@gmail.com',
--     '892009623','2025-11-17 11:56:29.267 +0000','admin','$2b$10$pk3izOhZ35EVUemDwwjmcORXQiPRUit7isOCaQIhlON0NH5E2Vj1C'

-- )
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

