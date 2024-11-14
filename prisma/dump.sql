--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO root;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AreaEnum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."AreaEnum" AS ENUM (
    'ECOMMERCE',
    'MARKETING',
    'HELPER',
    'MARKERPLACE',
    'PROYECTO',
    'BODEGA',
    'DESIGN'
);


ALTER TYPE public."AreaEnum" OWNER TO root;

--
-- Name: BrandEnum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."BrandEnum" AS ENUM (
    'MAUI',
    'RIP',
    'VOLCOM',
    'RUSTY',
    'ADMIN'
);


ALTER TYPE public."BrandEnum" OWNER TO root;

--
-- Name: PriorityEnum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."PriorityEnum" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH'
);


ALTER TYPE public."PriorityEnum" OWNER TO root;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO root;

--
-- Name: StateEnum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."StateEnum" AS ENUM (
    'ESTIMATE',
    'BACKLOG',
    'INPROGRESS',
    'FOLLOWUP',
    'COMPLETE',
    'CANCEL'
);


ALTER TYPE public."StateEnum" OWNER TO root;

--
-- Name: WorkEnum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."WorkEnum" AS ENUM (
    'JEFATURA',
    'GERENCIA',
    'OPERARIO'
);


ALTER TYPE public."WorkEnum" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Access; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Access" (
    id text NOT NULL,
    name public."AreaEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Access" OWNER TO root;

--
-- Name: Action; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Action" (
    id text NOT NULL,
    name text NOT NULL,
    notion text NOT NULL
);


ALTER TABLE public."Action" OWNER TO root;

--
-- Name: Area; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Area" (
    id text NOT NULL,
    notion text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Area" OWNER TO root;

--
-- Name: Brand; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Brand" (
    id text NOT NULL,
    name public."BrandEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Brand" OWNER TO root;

--
-- Name: Estimate; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Estimate" (
    id text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "taskId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Estimate" OWNER TO root;

--
-- Name: History; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."History" (
    id text NOT NULL,
    name text NOT NULL,
    action text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."History" OWNER TO root;

--
-- Name: Hours; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Hours" (
    id text NOT NULL,
    notion text NOT NULL,
    name text NOT NULL,
    mintime integer,
    "time" integer NOT NULL,
    maxtime integer,
    area text NOT NULL,
    action text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Hours" OWNER TO root;

--
-- Name: Priority; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Priority" (
    id text NOT NULL,
    name public."PriorityEnum" NOT NULL,
    notion text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Priority" OWNER TO root;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    name text NOT NULL,
    notion text NOT NULL,
    complete integer DEFAULT 0 NOT NULL,
    pending integer DEFAULT 0 NOT NULL,
    count integer DEFAULT 0 NOT NULL,
    priority integer NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Project" OWNER TO root;

--
-- Name: Schedule; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Schedule" (
    id text NOT NULL,
    name text NOT NULL,
    input text NOT NULL,
    output text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Schedule" OWNER TO root;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO root;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    "incrementId" integer NOT NULL,
    notion text,
    name text NOT NULL,
    solicitador text NOT NULL,
    url text,
    "notionUrl" text NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    request jsonb NOT NULL,
    project text NOT NULL,
    action text NOT NULL,
    state public."StateEnum" DEFAULT 'ESTIMATE'::public."StateEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text NOT NULL,
    priority text NOT NULL
);


ALTER TABLE public."Task" OWNER TO root;

--
-- Name: Task_incrementId_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Task_incrementId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Task_incrementId_seq" OWNER TO root;

--
-- Name: Task_incrementId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Task_incrementId_seq" OWNED BY public."Task"."incrementId";


--
-- Name: Type; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Type" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    form text
);


ALTER TABLE public."Type" OWNER TO root;

--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    work public."WorkEnum" DEFAULT 'OPERARIO'::public."WorkEnum" NOT NULL,
    "accessName" public."AreaEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: _AccessToProject; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."_AccessToProject" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_AccessToProject" OWNER TO root;

--
-- Name: _AccessToType; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."_AccessToType" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_AccessToType" OWNER TO root;

--
-- Name: _BrandToTask; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."_BrandToTask" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_BrandToTask" OWNER TO root;

--
-- Name: _ProjectToType; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."_ProjectToType" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProjectToType" OWNER TO root;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- Name: Task incrementId; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Task" ALTER COLUMN "incrementId" SET DEFAULT nextval('public."Task_incrementId_seq"'::regclass);


--
-- Data for Name: Access; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Access" (id, name, "createdAt", "updatedAt") FROM stdin;
clzbp6dho0000q75owf3e8hkm	ECOMMERCE	2024-08-01 19:57:23.533	2024-08-01 19:57:23.533
clzbp6dhy0001q75o2ysl46gz	MARKETING	2024-08-01 19:57:23.542	2024-08-01 19:57:23.542
clzbp6di30002q75oie2kcp6d	HELPER	2024-08-01 19:57:23.548	2024-08-01 19:57:23.548
clzbp6dib0003q75oq9o2qela	MARKERPLACE	2024-08-01 19:57:23.555	2024-08-01 19:57:23.555
clzbp6dij0004q75o5316ci5t	PROYECTO	2024-08-01 19:57:23.563	2024-08-01 19:57:23.563
clzbp6dir0005q75oek5c3l1l	BODEGA	2024-08-01 19:57:23.571	2024-08-01 19:57:23.571
clzbp6diy0006q75owvwc6te8	DESIGN	2024-08-01 19:57:23.579	2024-08-01 19:57:23.579
\.


--
-- Data for Name: Action; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Action" (id, name, notion) FROM stdin;
clzhi1z5700005irmzctexkd0	Subir	fed4ea6e-eafa-4e4e-9a50-e457a4875297
clzhi1z5p00015irmj25xfcba	Crear	e043cc21-8d38-4692-9f34-3e58bfd8e95e
clzhi1z5s00035irmqhn0yqm3	Eliminar	1e9d630f-a354-4ba1-8fe6-166f273805af
clzhi1z5r00025irmoahjwbzc	Actualizar	579df232-3c34-421d-b190-0dd59ca8f3a1
\.


--
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Area" (id, notion, name, "createdAt", "updatedAt") FROM stdin;
clzhi49p500065irm1gutr0jk	18232f5b-4f88-443f-92fc-022442e182fd	Categoria	2024-08-05 21:26:25.049	2024-08-05 21:26:25.049
clzhi49p700075irmpllqsbju	5b65511e-03b0-45a6-a999-c1300217afb8	Banner	2024-08-05 21:26:25.05	2024-08-05 21:26:25.05
clzhi49p700095irm37lkcimg	a2248310-5691-4b9f-8632-9d6d9c2e7a7f	Bloque	2024-08-05 21:26:25.05	2024-08-05 21:26:25.05
clzhi49p700085irm2xxzcwai	b56e9ef4-2bbc-4356-9a72-3d5af6972717	Redes Sociales	2024-08-05 21:26:25.049	2024-08-05 21:26:25.049
clzhi49p7000a5irmsg8d1cig	d472119b-0416-454e-8900-d9ee154204e4	Mailing	2024-08-05 21:26:25.05	2024-08-05 21:26:25.05
clzhi49pf000b5irmnyrt6k3b	9a530010-12e8-4007-ab2f-d6ff0dd63002	Slider	2024-08-05 21:26:25.05	2024-08-05 21:26:25.05
\.


--
-- Data for Name: Brand; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Brand" (id, name, "createdAt", "updatedAt") FROM stdin;
clzbp6e6p000gq75owl89ev1z	MAUI	2024-08-01 19:57:24.434	2024-08-01 19:57:24.434
clzbp6e6u000hq75ohktt6kr3	RIP	2024-08-01 19:57:24.439	2024-08-01 19:57:24.439
clzbp6e6z000iq75o6yznhw0d	VOLCOM	2024-08-01 19:57:24.443	2024-08-01 19:57:24.443
clzbp6e72000jq75o5d8vyjw3	RUSTY	2024-08-01 19:57:24.446	2024-08-01 19:57:24.446
clzbp6e75000kq75o1fmqsrtw	ADMIN	2024-08-01 19:57:24.45	2024-08-01 19:57:24.45
\.


--
-- Data for Name: Estimate; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Estimate" (id, "startDate", "endDate", "taskId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: History; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."History" (id, name, action, "createdAt", "updatedAt") FROM stdin;
clzbrbaej000aloivl24wh3am	PROJECT	DOWNLOAD	2024-08-01 20:57:12.008	2024-08-01 20:57:12.008
clzhhtazr00013de7r2nc1rx5	PRIORITY	DOWNLOAD	2024-08-05 21:17:53.494	2024-08-05 21:17:53.494
clzhhtbqu00043de7k1v02ryf	PROJECT	DOWNLOAD	2024-08-05 21:17:54.486	2024-08-05 21:17:54.486
clzhi1z5t00045irm9hp5fey6	ACTION	DOWNLOAD	2024-08-05 21:24:38.059	2024-08-05 21:24:38.059
clzhi49gm00055irmig0hfc5f	ACTION	DOWNLOAD	2024-08-05 21:26:24.741	2024-08-05 21:26:24.741
clzhi49pi000c5irmx7ek09lh	AREAS	DOWNLOAD	2024-08-05 21:26:25.05	2024-08-05 21:26:25.05
clzhi4a1v000d5irmvv1xjj2a	PRIORITY	DOWNLOAD	2024-08-05 21:26:25.508	2024-08-05 21:26:25.508
clzhi4a9m000e5irmx8gyxbv4	PROJECT	DOWNLOAD	2024-08-05 21:26:25.786	2024-08-05 21:26:25.786
clzhi6fi3000f5irmj9osuzhd	ACTION	DOWNLOAD	2024-08-05 21:28:05.882	2024-08-05 21:28:05.882
clzhi6fzw000g5irmvfk6ipf2	AREAS	DOWNLOAD	2024-08-05 21:28:06.525	2024-08-05 21:28:06.525
clzhi6gq6000h5irmrcwckm00	PRIORITY	DOWNLOAD	2024-08-05 21:28:07.471	2024-08-05 21:28:07.471
clzhi6gze000i5irmauzbnjfj	PROJECT	DOWNLOAD	2024-08-05 21:28:07.802	2024-08-05 21:28:07.802
clzhi6wte000j5irms5vzmper	ACTION	DOWNLOAD	2024-08-05 21:28:28.321	2024-08-05 21:28:28.321
clzhi6xim000k5irmcsd5g4v1	AREAS	DOWNLOAD	2024-08-05 21:28:29.23	2024-08-05 21:28:29.23
clzhi6y7f000l5irmphzt7fys	PRIORITY	DOWNLOAD	2024-08-05 21:28:30.124	2024-08-05 21:28:30.124
clzhi6yg0000m5irm3vueev31	PROJECT	DOWNLOAD	2024-08-05 21:28:30.433	2024-08-05 21:28:30.433
clzhi7g0j000n5irmmi5tkbd5	ACTION	DOWNLOAD	2024-08-05 21:28:53.202	2024-08-05 21:28:53.202
clzhi7gbf000o5irmb2pxwhrm	AREAS	DOWNLOAD	2024-08-05 21:28:53.596	2024-08-05 21:28:53.596
clzhi7gjv000p5irmrk0qtf79	PRIORITY	DOWNLOAD	2024-08-05 21:28:53.9	2024-08-05 21:28:53.9
clzhi7gut000q5irmwvxk859x	PROJECT	DOWNLOAD	2024-08-05 21:28:54.293	2024-08-05 21:28:54.293
clzhi8812000r5irm2v35wz6s	ACTION	DOWNLOAD	2024-08-05 21:29:29.509	2024-08-05 21:29:29.509
clzhi889t000s5irmrg88t6o9	AREAS	DOWNLOAD	2024-08-05 21:29:29.825	2024-08-05 21:29:29.825
clzhi88lt000t5irmjqwtbf4n	PRIORITY	DOWNLOAD	2024-08-05 21:29:30.257	2024-08-05 21:29:30.257
clzhi892w000u5irmx0mz4eqk	PROJECT	DOWNLOAD	2024-08-05 21:29:30.872	2024-08-05 21:29:30.872
\.


--
-- Data for Name: Hours; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Hours" (id, notion, name, mintime, "time", maxtime, area, action, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Priority; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Priority" (id, name, notion, "createdAt", "updatedAt") FROM stdin;
clzhhtazb00003de7y0d7b3q8	LOW	bfc1f74f-36ea-4c8b-8adc-bdb025445d16	2024-08-05 21:17:53.493	2024-08-05 21:17:53.493
clzhhtazt00023de7irx5a0l8	MEDIUM	0d0c800d-4456-41dc-99ea-d2b120d67b25	2024-08-05 21:17:53.493	2024-08-05 21:17:53.493
clzhhtazt00033de7rnhj6hw5	HIGH	ebd59921-b7eb-41f9-9268-339695f39a9a	2024-08-05 21:17:53.493	2024-08-05 21:17:53.493
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Project" (id, name, notion, complete, pending, count, priority, url, "createdAt", "updatedAt") FROM stdin;
clzbrbadj0000loivkoll85mx	Centro de Ayuda	32e27d11-10ed-432d-8c08-04359aac5808	0	0	0	10	https://mauiandsonscl.notion.site/Centro-de-Ayuda-32e27d1110ed432d8c0804359aac5808	2024-08-01 20:57:12.005	2024-08-01 20:57:12.005
clzbrbae00001loivfha1ketg	Auditoria	3a2fd836-cb58-47f6-b4d0-9a5733bf8561	0	0	0	3	https://mauiandsonscl.notion.site/Auditoria-3a2fd836cb5847f6b4d09a5733bf8561	2024-08-01 20:57:12.007	2024-08-01 20:57:12.007
clzbrbae40002loiv5byut8lv	SalesForce	97de03f1-15eb-4e64-9f78-7a7fb065b6b7	0	0	0	5	https://mauiandsonscl.notion.site/SalesForce-97de03f115eb4e649f787a7fb065b6b7	2024-08-01 20:57:12.007	2024-08-01 20:57:12.007
clzbrbae70003loival0vr7o1	B2C Contenido	3c60c092-c475-497d-b2e7-0b64d4090b04	0	3	3	7	https://mauiandsonscl.notion.site/B2C-Contenido-3c60c092c475497db2e70b64d4090b04	2024-08-01 20:57:12.005	2024-08-01 20:57:12.005
clzbrbae70004loivxx09mluh	Marketing Digital	2187b63c-03a9-4314-84f1-ebaf40135cd1	0	0	0	9	https://mauiandsonscl.notion.site/Marketing-Digital-2187b63c03a9431484f1ebaf40135cd1	2024-08-01 20:57:12.005	2024-08-01 20:57:12.005
clzbrbae90005loivq2zr1ihw	Producción Fotografica	07a08627-474d-4b66-b386-eae9fe927af8	0	0	0	6	https://mauiandsonscl.notion.site/Producci-n-Fotografica-07a08627474d4b66b386eae9fe927af8	2024-08-01 20:57:12.006	2024-08-01 20:57:12.006
clzbrbae90006loivxcgjx9yu	Desarrollos Evolutivos	0786fa58-285a-443a-83ba-1da835607a1d	0	1	1	1	https://mauiandsonscl.notion.site/Desarrollos-Evolutivos-0786fa58285a443a83ba1da835607a1d	2024-08-01 20:57:12.007	2024-08-01 20:57:12.007
clzbrbaec0007loiv6qctwqj5	Template Ecommerce	64552faa-9e1b-4872-b154-f6ccc53f88f1	0	0	0	4	https://mauiandsonscl.notion.site/Template-Ecommerce-64552faa9e1b4872b154f6ccc53f88f1	2024-08-01 20:57:12.007	2024-08-01 20:57:12.007
clzbrbaef0008loivr71dl5zc	Empresa	57f8ce17-e163-496f-aab7-193852cbe571	0	0	0	2	https://mauiandsonscl.notion.site/Empresa-57f8ce17e163496faab7193852cbe571	2024-08-01 20:57:12.008	2024-08-01 20:57:12.008
clzbrbaef0009loivxebveyrh	B2B Contenido	eef8ea23-ccc1-43d2-8866-bd606b54c72d	0	1	1	8	https://mauiandsonscl.notion.site/B2B-Contenido-eef8ea23ccc143d28866bd606b54c72d	2024-08-01 20:57:12.006	2024-08-01 20:57:12.006
\.


--
-- Data for Name: Schedule; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Schedule" (id, name, input, output, "createdAt", "updatedAt") FROM stdin;
clzbp6e79000lq75ofply8kim	Monday	08:30	18:00	2024-08-01 19:57:24.454	2024-08-01 19:57:24.454
clzbp6e7f000mq75ol8n2ujv3	Tuesday	08:30	18:00	2024-08-01 19:57:24.46	2024-08-01 19:57:24.46
clzbp6e7j000nq75on7qg16cl	Wednesday	08:30	18:00	2024-08-01 19:57:24.463	2024-08-01 19:57:24.463
clzbp6e7m000oq75ooelhfzmk	Thursday	08:30	18:00	2024-08-01 19:57:24.466	2024-08-01 19:57:24.466
clzbp6e7p000pq75o5i1b3n79	Friday	08:30	17:00	2024-08-01 19:57:24.469	2024-08-01 19:57:24.469
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Session" (id, token, "expiresAt", email, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Task" (id, "incrementId", notion, name, solicitador, url, "notionUrl", "endDate", request, project, action, state, "createdAt", "updatedAt", description, priority) FROM stdin;
\.


--
-- Data for Name: Type; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Type" (id, name, "createdAt", "updatedAt", form) FROM stdin;
clzbp6e8l000vq75opve90kl1	CUSTOM	2024-08-01 19:57:24.501	2024-08-01 19:58:05.348	custom
clzbp6e7t000qq75ot1eno8mg	WEB	2024-08-01 19:57:24.473	2024-08-01 19:58:05.348	web
clzbp6e80000rq75o588iaibx	REDES	2024-08-01 19:57:24.481	2024-08-01 19:58:05.348	redes
clzbp6e86000sq75o8yv76djx	MAILING	2024-08-01 19:57:24.486	2024-08-01 19:58:05.348	mailing
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, email, name, password, role, work, "accessName", "createdAt", "updatedAt") FROM stdin;
clzbp6dlv0007q75o0r0ceru3	robert.garcia@mauiandsons.cl	robert garcia	$2a$10$bbfFUr/q8z49DLjkW7jA4.yHZ/AMc1XDP8Yqet9yUY.xL8fVQTv3m	ADMIN	JEFATURA	ECOMMERCE	2024-08-01 19:57:23.683	2024-08-01 19:57:23.683
clzbp6doh0008q75oaosvzo8x	ignacio.fernandez@mauiandsons.cl	ignacio fernandez	$2a$10$0zTGF3SzNEZikiB.gTblneC1abMxpmerWxLFXWDRpw2fjmz.60P3e	USER	GERENCIA	ECOMMERCE	2024-08-01 19:57:23.778	2024-08-01 19:57:23.778
clzbp6dr20009q75otild5hll	sebastian.alvarez@mauiandsons.cl	sebastian alvarez	$2a$10$RqULsRLal/iQkcjY0Juafey00/5XI1z7lrRJUP.smnVWlOTjKXuCi	USER	GERENCIA	MARKERPLACE	2024-08-01 19:57:23.871	2024-08-01 19:57:23.871
clzbp6dtl000aq75ogyarpmxj	valentina.gomez@mauiandsons.cl	valentina gomez	$2a$10$ufBdQkZTSTfjFtG2lnPHIe3mXsnsNBeG4q2XJGbCYqumzGPsMaRX.	USER	OPERARIO	MARKERPLACE	2024-08-01 19:57:23.961	2024-08-01 19:57:23.961
clzbp6dw6000bq75ohdjtpcv5	belen.galvez@mauiandsons.cl	belen galvez	$2a$10$NSCVrEcqxuLHcDvm/rGImeBnjujG6asqLFL9g6yayftBuISbqTNOy	USER	OPERARIO	MARKERPLACE	2024-08-01 19:57:24.055	2024-08-01 19:57:24.055
clzbp6dyq000cq75osymsyiyr	mauricio.escobedo@mauiandsons.cl	mauricio escobedo	$2a$10$51qFCcx5fC9FkiX7XTkoOuKfPaPaVMGxLir6LMqdmsPis8ZnKsBH2	USER	OPERARIO	ECOMMERCE	2024-08-01 19:57:24.147	2024-08-01 19:57:24.147
clzbp6e1c000dq75og5hsdpxv	karen.rojas@mauiandsons.cl	karen rojas	$2a$10$YlLEl.8so0sm3n.eDs3u5OiGRvgktm7bQAttisc6cfsagw999nKNS	USER	OPERARIO	ECOMMERCE	2024-08-01 19:57:24.24	2024-08-01 19:57:24.24
clzbp6e40000eq75oh61nyzzy	macarena.torres@mauiandsons.cl	macarena torres	$2a$10$KCelTjrQzUwWFJcLGcJWD.8y.3xFxCOcv.4p8JoNg3w5QlFIzENze	USER	OPERARIO	MARKETING	2024-08-01 19:57:24.337	2024-08-01 19:57:24.337
clzbp6e6i000fq75o4eql21x1	daniela.oyarzun@mauiandsons.cl	daniela oyarzun	$2a$10$yDKnav1Btv6hy/8T4s.PZO.Ma4K/4SR1HMv7CoHRnvfR9xekzBOPa	USER	OPERARIO	MARKETING	2024-08-01 19:57:24.427	2024-08-01 19:57:24.427
\.


--
-- Data for Name: _AccessToProject; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."_AccessToProject" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _AccessToType; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."_AccessToType" ("A", "B") FROM stdin;
clzbp6dho0000q75owf3e8hkm	clzbp6e7t000qq75ot1eno8mg
clzbp6dho0000q75owf3e8hkm	clzbp6e80000rq75o588iaibx
clzbp6dhy0001q75o2ysl46gz	clzbp6e80000rq75o588iaibx
clzbp6dho0000q75owf3e8hkm	clzbp6e86000sq75o8yv76djx
clzbp6dhy0001q75o2ysl46gz	clzbp6e86000sq75o8yv76djx
clzbp6dho0000q75owf3e8hkm	clzbp6e8l000vq75opve90kl1
clzbp6dhy0001q75o2ysl46gz	clzbp6e8l000vq75opve90kl1
clzbp6dib0003q75oq9o2qela	clzbp6e8l000vq75opve90kl1
\.


--
-- Data for Name: _BrandToTask; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."_BrandToTask" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _ProjectToType; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."_ProjectToType" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
94bdca1e-c762-47cd-9638-4f261757fc8b	aa3d56c14c61e92a649584297ee581d1de940cd8ccd881faabae99d8a1730967	2024-08-01 19:56:31.160192+00	20240731140843_init	\N	\N	2024-08-01 19:56:30.992441+00	1
fa4c1003-d398-40ef-9141-3492ca843d37	a82cb8810b23af5b11ab3de24e1cc18b24c7801625c99fb7f2bcbbc1e1d971d6	2024-08-01 19:56:31.17535+00	20240801140527_init	\N	\N	2024-08-01 19:56:31.162215+00	1
38f88c3e-91dd-4279-a9d2-1e811fef7afc	5903ff768a3312088084387c483c3088630f2ed782698b377605a7cdb1796517	2024-08-01 19:56:31.181854+00	20240801195557_init	\N	\N	2024-08-01 19:56:31.177581+00	1
670df6cc-b2a2-44e4-bcae-24f1ac617e8c	dd283a8b1aaadc26b2ab46cf85fd9ae3b47fdb0bbcf159829d468a26854cec21	2024-08-01 19:57:02.929426+00	20240801195702_init	\N	\N	2024-08-01 19:57:02.923447+00	1
e087e0e1-e185-462e-acf3-788c3281009f	2cd7806bba2652adc8e604623114a5df1cae14b364cfd036dfa64ed7eb62cca7	2024-08-05 16:43:59.157152+00	20240805164359_init	\N	\N	2024-08-05 16:43:59.129181+00	1
3058d1f5-ef0c-4baf-8adf-95c351a8c0fe	b6511f8559f28b1f18b5d403f0d5d9f4bca4a5f5b414b8d0ac06f2aadaaccb68	2024-08-05 16:58:45.150513+00	20240805165845_init	\N	\N	2024-08-05 16:58:45.144471+00	1
bb1bbdd9-2b11-42f9-8ce9-315af0e2926d	e4ea46e163771c9a8a8be1d916fff215126bb6350a475aa1cbce1f1d9832043f	2024-08-05 18:33:38.272746+00	20240805183338_init	\N	\N	2024-08-05 18:33:38.260961+00	1
\.


--
-- Name: Task_incrementId_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Task_incrementId_seq"', 1, false);


--
-- Name: Access Access_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Access"
    ADD CONSTRAINT "Access_pkey" PRIMARY KEY (id);


--
-- Name: Action Action_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_pkey" PRIMARY KEY (id);


--
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY (id);


--
-- Name: Brand Brand_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (id);


--
-- Name: Estimate Estimate_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Estimate"
    ADD CONSTRAINT "Estimate_pkey" PRIMARY KEY (id);


--
-- Name: History History_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."History"
    ADD CONSTRAINT "History_pkey" PRIMARY KEY (id);


--
-- Name: Hours Hours_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Hours"
    ADD CONSTRAINT "Hours_pkey" PRIMARY KEY (id);


--
-- Name: Priority Priority_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Priority"
    ADD CONSTRAINT "Priority_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Schedule Schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: Type Type_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Type"
    ADD CONSTRAINT "Type_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Access_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Access_name_key" ON public."Access" USING btree (name);


--
-- Name: Action_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Action_name_key" ON public."Action" USING btree (name);


--
-- Name: Action_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Action_notion_key" ON public."Action" USING btree (notion);


--
-- Name: Area_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Area_name_key" ON public."Area" USING btree (name);


--
-- Name: Area_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Area_notion_key" ON public."Area" USING btree (notion);


--
-- Name: Brand_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Brand_name_key" ON public."Brand" USING btree (name);


--
-- Name: Estimate_taskId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Estimate_taskId_key" ON public."Estimate" USING btree ("taskId");


--
-- Name: Hours_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Hours_notion_key" ON public."Hours" USING btree (notion);


--
-- Name: Priority_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Priority_name_key" ON public."Priority" USING btree (name);


--
-- Name: Priority_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Priority_notion_key" ON public."Priority" USING btree (notion);


--
-- Name: Project_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Project_notion_key" ON public."Project" USING btree (notion);


--
-- Name: Schedule_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Schedule_name_key" ON public."Schedule" USING btree (name);


--
-- Name: Task_incrementId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Task_incrementId_key" ON public."Task" USING btree ("incrementId");


--
-- Name: Task_notion_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Task_notion_key" ON public."Task" USING btree (notion);


--
-- Name: Type_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Type_name_key" ON public."Type" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _AccessToProject_AB_unique; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "_AccessToProject_AB_unique" ON public."_AccessToProject" USING btree ("A", "B");


--
-- Name: _AccessToProject_B_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "_AccessToProject_B_index" ON public."_AccessToProject" USING btree ("B");


--
-- Name: _AccessToType_AB_unique; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "_AccessToType_AB_unique" ON public."_AccessToType" USING btree ("A", "B");


--
-- Name: _AccessToType_B_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "_AccessToType_B_index" ON public."_AccessToType" USING btree ("B");


--
-- Name: _BrandToTask_AB_unique; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "_BrandToTask_AB_unique" ON public."_BrandToTask" USING btree ("A", "B");


--
-- Name: _BrandToTask_B_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "_BrandToTask_B_index" ON public."_BrandToTask" USING btree ("B");


--
-- Name: _ProjectToType_AB_unique; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "_ProjectToType_AB_unique" ON public."_ProjectToType" USING btree ("A", "B");


--
-- Name: _ProjectToType_B_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "_ProjectToType_B_index" ON public."_ProjectToType" USING btree ("B");


--
-- Name: Estimate Estimate_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Estimate"
    ADD CONSTRAINT "Estimate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Hours Hours_action_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Hours"
    ADD CONSTRAINT "Hours_action_fkey" FOREIGN KEY (action) REFERENCES public."Action"(notion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Hours Hours_area_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Hours"
    ADD CONSTRAINT "Hours_area_fkey" FOREIGN KEY (area) REFERENCES public."Area"(notion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_email_fkey" FOREIGN KEY (email) REFERENCES public."User"(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_action_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_action_fkey" FOREIGN KEY (action) REFERENCES public."Action"(notion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_priority_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_priority_fkey" FOREIGN KEY (priority) REFERENCES public."Priority"(notion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_project_fkey" FOREIGN KEY (project) REFERENCES public."Project"(notion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_accessName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_accessName_fkey" FOREIGN KEY ("accessName") REFERENCES public."Access"(name) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _AccessToProject _AccessToProject_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_AccessToProject"
    ADD CONSTRAINT "_AccessToProject_A_fkey" FOREIGN KEY ("A") REFERENCES public."Access"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AccessToProject _AccessToProject_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_AccessToProject"
    ADD CONSTRAINT "_AccessToProject_B_fkey" FOREIGN KEY ("B") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AccessToType _AccessToType_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_AccessToType"
    ADD CONSTRAINT "_AccessToType_A_fkey" FOREIGN KEY ("A") REFERENCES public."Access"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AccessToType _AccessToType_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_AccessToType"
    ADD CONSTRAINT "_AccessToType_B_fkey" FOREIGN KEY ("B") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _BrandToTask _BrandToTask_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_BrandToTask"
    ADD CONSTRAINT "_BrandToTask_A_fkey" FOREIGN KEY ("A") REFERENCES public."Brand"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _BrandToTask _BrandToTask_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_BrandToTask"
    ADD CONSTRAINT "_BrandToTask_B_fkey" FOREIGN KEY ("B") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectToType _ProjectToType_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_ProjectToType"
    ADD CONSTRAINT "_ProjectToType_A_fkey" FOREIGN KEY ("A") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectToType _ProjectToType_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."_ProjectToType"
    ADD CONSTRAINT "_ProjectToType_B_fkey" FOREIGN KEY ("B") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

