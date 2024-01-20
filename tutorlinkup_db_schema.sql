    --
    -- PostgreSQL database dump
    --

    -- Dumped from database version 12.16
    -- Dumped by pg_dump version 14.4

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

    DROP DATABASE tutorlinkupps;
    --
    -- Name: tutorlinkupps; Type: DATABASE; Schema: -; Owner: postgres
    --

    CREATE DATABASE tutorlinkupps WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


    ALTER DATABASE tutorlinkupps OWNER TO postgres;

    \connect tutorlinkupps

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
    -- Name: mood; Type: TYPE; Schema: public; Owner: postgres
    --

    CREATE TYPE public.mood AS ENUM (
        'sad',
        'ok',
        'happy'
    );


    ALTER TYPE public.mood OWNER TO postgres;

    SET default_tablespace = '';

    SET default_table_access_method = heap;

    --
    -- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
    --

    CREATE TABLE public.attachment (
        id integer NOT NULL,
        filename character varying(255) NOT NULL,
        class_uuid character varying(255) NOT NULL,
        created_at timestamp without time zone DEFAULT ('now'::text)::timestamp with time zone NOT NULL,
        updated_at timestamp without time zone,
        file_url character varying(255),
        file_type character varying(30),
        uploaded_by character varying(30) NOT NULL
    );


    ALTER TABLE public.attachment OWNER TO postgres;

    --
    -- Name: attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --

    CREATE SEQUENCE public.attachment_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER TABLE public.attachment_id_seq OWNER TO postgres;

    --
    -- Name: attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --

    ALTER SEQUENCE public.attachment_id_seq OWNED BY public.attachment.id;


    --
    -- Name: classes; Type: TABLE; Schema: public; Owner: postgres
    --

    CREATE TABLE public.classes (
        id integer NOT NULL,
        name character varying(255) NOT NULL,
        class_uuid character varying(255) NOT NULL,
        description character varying(500) NOT NULL,
        created_at timestamp without time zone DEFAULT ('now'::text)::timestamp with time zone NOT NULL,
        updated_at timestamp without time zone,
        is_active boolean,
        created_by_user character varying(30) NOT NULL
    );


    ALTER TABLE public.classes OWNER TO postgres;

    --
    -- Name: classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --

    CREATE SEQUENCE public.classes_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER TABLE public.classes_id_seq OWNER TO postgres;

    --
    -- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --

    ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


    --
    -- Name: membership; Type: TABLE; Schema: public; Owner: postgres
    --

    CREATE TABLE public.membership (
        id integer NOT NULL,
        class_uuid character varying(255) NOT NULL,
        username character varying(30) NOT NULL
    );


    ALTER TABLE public.membership OWNER TO postgres;

    --
    -- Name: student_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --

    CREATE SEQUENCE public.student_membership_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER TABLE public.student_membership_id_seq OWNER TO postgres;

    --
    -- Name: student_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --

    ALTER SEQUENCE public.student_membership_id_seq OWNED BY public.membership.id;


    --
    -- Name: users; Type: TABLE; Schema: public; Owner: postgres
    --

    CREATE TABLE public.users (
        id integer NOT NULL,
        name character varying(255) NOT NULL,
        created_at timestamp without time zone DEFAULT ('now'::text)::timestamp with time zone NOT NULL,
        updated_at timestamp without time zone,
        gender character varying(10),
        username character varying(30) NOT NULL,
        email character varying(50) NOT NULL,
        avatar_state character varying(255),
        role character varying(30) NOT NULL
    );


    ALTER TABLE public.users OWNER TO postgres;

    --
    -- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --

    CREATE SEQUENCE public.users_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER TABLE public.users_id_seq OWNER TO postgres;

    --
    -- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --

    ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


    --
    -- Name: attachment id; Type: DEFAULT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.attachment ALTER COLUMN id SET DEFAULT nextval('public.attachment_id_seq'::regclass);


    --
    -- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


    --
    -- Name: membership id; Type: DEFAULT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.membership ALTER COLUMN id SET DEFAULT nextval('public.student_membership_id_seq'::regclass);


    --
    -- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


    --
    -- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: postgres
    --



    --
    -- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
    --



    --
    -- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: postgres
    --



    --
    -- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
    --

    INSERT INTO public.users (id, name, created_at, updated_at, gender, username, email, avatar_state, role) VALUES (1, 'nitin', '2023-12-19 21:57:25.001311', '2023-12-19 21:57:25.001311', 'male', 'nitiink', 'nitinkumar@gmail.com', 'someProfileImage', 'admin');


    --
    -- Name: attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --

    SELECT pg_catalog.setval('public.attachment_id_seq', 34, true);


    --
    -- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --

    SELECT pg_catalog.setval('public.classes_id_seq', 31, true);


    --
    -- Name: student_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --

    SELECT pg_catalog.setval('public.student_membership_id_seq', 34, true);


    --
    -- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --

    SELECT pg_catalog.setval('public.users_id_seq', 33, true);


    --
    -- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.attachment
        ADD CONSTRAINT attachment_pkey PRIMARY KEY (id, filename);


    --
    -- Name: attachment attachment_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.attachment
        ADD CONSTRAINT attachment_unique UNIQUE (filename, class_uuid);


    --
    -- Name: classes class_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.classes
        ADD CONSTRAINT class_name_unique UNIQUE (name);


    --
    -- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.classes
        ADD CONSTRAINT classes_pkey PRIMARY KEY (class_uuid);


    --
    -- Name: membership student_membership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.membership
        ADD CONSTRAINT student_membership_pkey PRIMARY KEY (id);


    --
    -- Name: users unique_id_email; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.users
        ADD CONSTRAINT unique_id_email UNIQUE (email);


    --
    -- Name: users username_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.users
        ADD CONSTRAINT username_pkey PRIMARY KEY (username);


    --
    -- Name: attachment_name_uuid_type_idx; Type: INDEX; Schema: public; Owner: postgres
    --

    CREATE INDEX attachment_name_uuid_type_idx ON public.attachment USING btree (filename, class_uuid, file_type);


    --
    -- Name: class_uuid_creator_idx; Type: INDEX; Schema: public; Owner: postgres
    --

    CREATE INDEX class_uuid_creator_idx ON public.classes USING btree (class_uuid, created_by_user);


    --
    -- Name: attachment attachment_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.attachment
        ADD CONSTRAINT attachment_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(username);


    --
    -- Name: classes classes_created_by_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.classes
        ADD CONSTRAINT classes_created_by_user_fkey FOREIGN KEY (created_by_user) REFERENCES public.users(username) ON DELETE CASCADE;


    --
    -- Name: membership student_membership_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --

    ALTER TABLE ONLY public.membership
        ADD CONSTRAINT student_membership_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE;


    --
    -- PostgreSQL database dump complete
    --

