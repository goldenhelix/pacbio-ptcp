// @ts-check
import fs from 'fs';
import { runTemplateConvert } from '@system/libs/word_templater.js';

import * as systemFilters from '@system/filters/utils.js';

/**
 * @typedef {import('../@types/api_project_report.js').ApiProjectReport} ApiProjectReport
 * @typedef {import('../@types/project_report.js').ProjectReport} ProjectReport
 */

const StrDetailInclusionClassifications = [
    "Pathogenic",
    "Intermediate",
];

const SvInclusionClassifications = [
    "Pathogenic",
    "Intermediate",
];

const MustCallTandemRepeatIDs = [
    "FXN", 
    "EIEE1_ARX", 
    "PRTS_ARX", 
    "FMR1", 
    "AFF2"
]

// TODO: support gene aliases
const GeneData = [
    {
        "gene": "ABCA3",
        "disorder": "Surfactant metabolism dysfunction, pulmonary 3"
    },
    {
        "gene": "ABCA4",
        "disorder": "Stargardt Disease, Type 1"
    },
    {
        "gene": "ABCC8",
        "disorder": "Diabetes mellitus, permanent neonatal 3"
    },
    {
        "gene": "ABCD1",
        "disorder": "Adrenoleukodystrophy"
    },
    {
        "gene": "ACADM",
        "disorder": "Medium Chain Acyl-CoA Dehydrogenase Deficiency"
    },
    {
        "gene": "ACADVL",
        "disorder": "Very Long-Chain Acyl-CoA Dehydrogenase Deficiency"
    },
    {
        "gene": "ACAT1",
        "disorder": "α-Methylacetoacetic aciduria"
    },
    {
        "gene": "AFF2",
        "disorder": "INTELLECTUAL DEVELOPMENTAL DISORDER, X-LINKED "
    },
    {
        "gene": "AGA",
        "disorder": "Aspartylglucosaminuria"
    },
    {
        "gene": "AGXT",
        "disorder": "Hyperoxaluria, Primary, Type 1"
    },
    {
        "gene": "AHI1",
        "disorder": "Joubert syndrome 3"
    },
    {
        "gene": "AIRE",
        "disorder": "Autoimmune polyendocrinopathy syndrome, type I"
    },
    {
        "gene": "ALDOB",
        "disorder": "Hereditary fructosuria"
    },
    {
        "gene": "ALPL",
        "disorder": "Hypophosphatasia"
    },
    {
        "gene": "ANO10",
        "disorder": "Spinocerebellar ataxia 10"
    },
    {
        "gene": "ARSA",
        "disorder": "Metachromatic Leukodystrophy"
    },
    {
        "gene": "ARX",
        "disorder": "Developmental and epileptic encephalopathy 1"
    },
    {
        "gene": "ASL",
        "disorder": "Argininosuccinate Lyase Deficiency"
    },
    {
        "gene": "ASPA",
        "disorder": "Canavan Disease"
    },
    {
        "gene": "ATP7B",
        "disorder": "Wilson Disease"
    },
    {
        "gene": "ATXN1",
        "disorder": "Spinocerebellar Ataxia Type 1",
    },
    {
        "gene": "BBS1",
        "disorder": "Bardet-Biedl Syndrome 1"
    },
    {
        "gene": "BBS2",
        "disorder": "Bardet–Biedl syndrome 2"
    },
    {
        "gene": "BCKDHB",
        "disorder": "Maple Syrup Urine Disease"
    },
    {
        "gene": "BLM",
        "disorder": "Bloom Syndrome"
    },
    {
        "gene": "BTD",
        "disorder": "Biotinidase Deficiency"
    },
    {
        "gene": "CBS",
        "disorder": " Homocystinuria, B6 responsive and nonresponsive"
    },
    {
        "gene": "CC2D2A",
        "disorder": "Joubert syndrome 9"
    },
    {
        "gene": "CCDC88C",
        "disorder": "Congenital hydrocephalus 1"
    },
    {
        "gene": "CEP290",
        "disorder": "Leber congenital amaurosis 10"
    },
    {
        "gene": "CFTR",
        "disorder": "Cystic Fibrosis"
    },
    {
        "gene": "CHRNE",
        "disorder": "Myasthenic syndrome, congenital, 4A, slow-channel"
    },
    {
        "gene": "CLCN1",
        "disorder": "Congenital myotonia, autosomal recessive form"
    },
    {
        "gene": "CLRN1",
        "disorder": "Usher Syndrome 3a"
    },
    {
        "gene": "CNGB3",
        "disorder": "Achromatopsia 3"
    },
    {
        "gene": "COL7A1",
        "disorder": "Recessive dystrophic epidermolysis bullosa"
    },
    {
        "gene": "CPT2",
        "disorder": "Carnitine palmitoyltransferase II deficiency, infantile"
    },
    {
        "gene": "CYP11A1",
        "disorder": "ADRENAL INSUFFICIENCY, CONGENITAL, WITH 46,XY SEX REVERSAL, PARTIAL OR COMPLETE"
    },
    {
        "gene": "CYP21A2",
        "disorder": "Congenital Adrenal Hyperplasia, 21-hydroxylase-deficient"
    },
    {
        "gene": "CYP27A1",
        "disorder": "Cerebrotendinous Xanthomatosis"
    },
    {
        "gene": "CYP27B1",
        "disorder": "Vitamin D-dependent rickets type 1A"
    },
    {
        "gene": "DHCR7",
        "disorder": "Smith-Lemli-Opitz Syndrome"
    },
    {
        "gene": "DHDDS",
        "disorder": "Retinitis Pigmentosa 59"
    },
    {
        "gene": "DLD",
        "disorder": "Dihydrolipoamide Dehydrogenase Deficiency"
    },
    {
        "gene": "DMD",
        "disorder": "Muscular dystrophy, Becker type"
    },
    {
        "gene": "DYNC2H1",
        "disorder": "Short-rib thoracic dysplasia 3 with or without polydactyly"
    },
    {
        "gene": "ELP1",
        "disorder": "Dysautonomia, familial"
    },
    {
        "gene": "ERCC2",
        "disorder": "Xeroderma Pigmentosum Group D"
    },
    {
        "gene": "EVC2",
        "disorder": "Ellis-van Creveld Syndrome"
    },
    {
        "gene": "F8",
        "disorder": "Hemophilia A"
    },
    {
        "gene": "F9",
        "disorder": "Hemophilia B"
    },
    {
        "gene": "FAH",
        "disorder": "Tyrosinemia, Type I"
    },
    {
        "gene": "FANCC",
        "disorder": "Fanconi anemia, complementation group C"
    },
    {
        "gene": "FKRP",
        "disorder": " Muscular dystrophy–dystroglycanopathy, type A, 5"
    },
    {
        "gene": "FKTN",
        "disorder": "Walker-Warburg Syndrome, FKTN-Related"
    },
    {
        "gene": "FMO3",
        "disorder": "Trimethylaminuria"
    },
    {
        "gene": "FMR1",
        "disorder": "Fragile X syndrome"
    },
    {
        "gene": "FXN",
        "disorder": "Friedreich ataxia"
    },
    {
        "gene": "G6PC",
        "disorder": "Glycogen Storage Disease, Type IA"
    },
    {
        "gene": "GAA",
        "disorder": "Glycogen Storage Disease, Type II"
    },
    {
        "gene": "GALT",
        "disorder": "Galactosemia"
    },
    {
        "gene": "GBA",
        "disorder": "Gaucher Disease",
    },
    {
        "gene": "GBA1",
        "disorder": "Gaucher Disease",
    },
    {
        "gene": "GBE1",
        "disorder": "Glycogen Storage Disease, Type IV"
    },
    {
        "gene": "GLA",
        "disorder": "Fabry disease"
    },
    {
        "gene": "GJB2",
        "disorder": "Non-Syndromic Hearing Loss"
    },
    {
        "gene": "GNPTAB",
        "disorder": "Mucolipidosis II"
    },
    {
        "gene": "GRIP1",
        "disorder": "Fraser syndrome"
    },
    {
        "gene": "HBA1",
        "disorder": "Alpha-Thalassemia"
    },
    {
        "gene": "HBA2",
        "disorder": "Alpha-Thalassemia"
    },
    {
        "gene": "HBB",
        "disorder": "Beta-Hemoglobinopathies"
    },
    {
        "gene": "HEXA",
        "disorder": "Tay-Sachs Disease"
    },
    {
        "gene": "HPS1",
        "disorder": "Hermansky-Pudlak Syndrome 1"
    },
    {
        "gene": "HPS3",
        "disorder": "Hermansky-Pudlak Syndrome 3"
    },
    {
        "gene": "HTT",
        "disorder": "Huntington Disease"
    },
    {
        "gene": "IDUA",
        "disorder": " Mucopolysaccharidosis, Ih (Hurler S)"
    },
    {
        "gene": "L1CAM",
        "disorder": "Hydrocephalus due to congenital stenosis of aqueduct of Sylvius"
    },
    {
        "gene": "LRP2",
        "disorder": "Donnai–Barrow syndrome"
    },
    {
        "gene": "MCCC2",
        "disorder": "3-Methylcrotonyl-CoA Carboxylase 2 Deficiency"
    },
    {
        "gene": "MCPH1",
        "disorder": "Primary microcephaly 1, recessive"
    },
    {
        "gene": "MCOLN1",
        "disorder": "Mucolipidosis, Type IV"
    },
    {
        "gene": "MID1",
        "disorder": "Opitz GBBB syndrome, type I"
    },
    {
        "gene": "MLC1",
        "disorder": "Megalencephalic leukoencephalopathy with subcortical cysts"
    },
    {
        "gene": "MMACHC",
        "disorder": "Methylmalonic aciduria with homocystinuria cblC type"
    },
    {
        "gene": "MUT",
        "disorder": "Methylmalonic aciduria due to methylmalonyl-CoA mutase deficiency"
    },
    {
        "gene": "MVK",
        "disorder": "Hyper-IgD syndrome"
    },
    {
        "gene": "NAGA",
        "disorder": "Schindler disease, type 1"
    },
    {
        "gene": "NEB",
        "disorder": " Nemaline myopathy 2"
    },
    {
        "gene": "NPHS1",
        "disorder": "Congenital Finnish Nephrosis"
    },
    {
        "gene": "NROB1",
        "disorder": "Adrenal hypoplasia, congenital"
    },
    {
        "gene": "OCA2",
        "disorder": "Oculocutaneous albinism brown and type II"
    },
    {
        "gene": "OTC",
        "disorder": "Ornithine transcarbamylase deficiency"
    },
    {
        "gene": "PAH",
        "disorder": "Phenylketonuria"
    },
    {
        "gene": "PCDH15",
        "disorder": "Usher Syndrome, Type 1F"
    },
    {
        "gene": "PKHD1",
        "disorder": "Polycystic Kidney Disease, Autosomal Recessive"
    },
    {
        "gene": "PLP1",
        "disorder": "Spastic paraplegia 2, X-linked"
    },
    {
        "gene": "PMM2",
        "disorder": "Congenital Disorder of Glycosylation, Type 1A"
    },
    {
        "gene": "POLG",
        "disorder": "Mitochondrial DNA depletion syndrome 4A"
    },
    {
        "gene": "PRF1",
        "disorder": "Hemophagocytic lymphohistiocytosis, familial, 2"
    },
    {
        "gene": "RARS2",
        "disorder": "Pontocerebellar Hypoplasia, Type 6"
    },
    {
        "gene": "RNASEH2B",
        "disorder": "Aicardi Goutieres syndrome 2"
    },
    {
        "gene": "RPGR",
        "disorder": "Retinitis pigmentosa 3"
    },
    {
        "gene": "RS1",
        "disorder": "Retinoschisis 1, X-linked, juvenile"
    },
    {
        "gene": "SCO2",
        "disorder": "Mitochondrial complex IV deficiency, nuclear type 2"
    },
    {
        "gene": "SLC19A3",
        "disorder": "Basal ganglia disease, biotin-responsive"
    },
    {
        "gene": "SLC26A2",
        "disorder": "Achondrogenesis, Type 1B"
    },
    {
        "gene": "SLC6A8",
        "disorder": "Cerebral creatine deficiency syndrome 1"
    },
    {
        "gene": "SLC26A4",
        "disorder": "Pendred Syndrome"
    },
    {
        "gene": "SLC37A4",
        "disorder": "Glycogen Storage Disease, Type IB"
    },
    {
        "gene": "SMN1",
        "disorder": "Spinal muscular atrophy"
    },
    {
        "gene": "SMPD1",
        "disorder": "Niemann-Pick Disease, Types A"
    },
    {
        "gene": "TF",
        "disorder": "Atransferrinemia"
    },
    {
        "gene": "TMEM216",
        "disorder": "Joubert Syndrome 2"
    },
    {
        "gene": "TNXB",
        "disorder": "Ehlers-Danlos syndrome, classic-like, 1"
    },
    {
        "gene": "TYR",
        "disorder": "Oculocutaneous Albinism, Type 1"
    },
    {
        "gene": "USH2A",
        "disorder": "Usher Syndrome, Type 2A"
    },
    {
        "gene": "XPC",
        "disorder": "Xeroderma Pigmentosum Group C"
    }
];

const disorderDescriptions = {
    "3-Methylcrotonyl-CoA Carboxylase 2 Deficiency": "Any 3-methylcrotonyl-CoA carboxylase deficiency in which the cause of the disease is a mutation in the MCCC2 gene.",
    "ADRENAL INSUFFICIENCY, CONGENITAL, WITH 46,XY SEX REVERSAL, PARTIAL OR COMPLETE": "A rare, genetic, developmental defect during embryogenesis disorder characterized by severe, early-onset, salt-wasting adrenal insufficiency and ambiguous/female external genitalia (irrespective of chromosomal sex) due to mutations in the CYP11A1 gene. Milder cases may present delayed onset of adrenal gland dysfunction and genitalia phenotype may range from normal male to female in individuals with 46,XY karyotype. Imaging studies reveal hypoplastic/absent adrenal glands and biochemical findings include low serum cortisol, mineralocorticoids, androgens, and sodium, with elevated potassium levels.",
    "Achondrogenesis, Type 1B": "Achondrogenesis type 1B (ACG1B), a form of achondrogenesis, is a rare lethal skeletal dysplasia characterized by severe micromelia with very short fingers and toes, a flat face, a short neck, thickened soft tissue around the neck, hypoplasia of the thorax, protuberant abdomen, a hydropic fetal appearance and distinctive histological features of the cartilage.",
    "Achromatopsia 3": "Any achromatopsia in which the cause of the disease is a mutation in the CNGB3 gene.",
    "Adrenal hypoplasia, congenital": "A X-linked condition characterized by underdevelopment of the adrenal gland and adrenal insufficiency caused by mutation(s) in the NR0B1 gene, resulting in decreased activity of the nuclear receptor protein DAX1, which may be associated with hypogonadotropic hypogonadism.",
    "Adrenoleukodystrophy": "A peroxisomal disorder resulting in cerebral demyelination, axonal dysfunction in the spinal cord leading to spastic paraplegia, adrenal insufficiency and in some cases testicular insufficiency.",
    "Aicardi Goutieres syndrome 2": "Aicardi-Goutieres syndrome (AGS) is an inherited, subacute encephalopathy characterised by the association of basal ganglia calcification, leukodystrophy and cerebrospinal fluid (CSF) lymphocytosis.",
    "Alpha-Thalassemia": "Alpha-thalassemia is an inherited hemoglobinopathy characterized by impaired synthesis of alpha-globin chains leading to a variable clinical picture depending on the number of affected alleles.",
    "Argininosuccinate Lyase Deficiency": "Argininosuccinate Lyase (ASL) is a cytosolic enzyme which catalyzes the fourth reaction in the cycle and the first degradative step, i.e. the breakdown of argininosuccinic acid to arginine and fumarate. Deficiency of ASL results in an accumulation of argininosuccinic acid in tissues, and excretion of argininosuccinic acid in urine leading to the condition argininosuccinic aciduria.",
    "Aspartylglucosaminuria": "Aspartylglycosaminuria (AGU) is an autosomal recessive lysosomal storage disease belonging to the oligosaccharidosis group (also called glycoproteinosis).",
    "Atransferrinemia": "Congenital atransferrinemia is a very rare hematologic disease caused by a transferrin (TF) deficiency and characterized by microcytic, hypochromic anemia (manifesting with pallor, fatigue and growth retardation) and iron overload, and that can be fatal if left untreated.",
    "Autoimmune polyendocrinopathy syndrome, type I": "A group of diverse conditions that are characterized by spontaneous, multi-organ autoimmunity, which target both endocrine (adrenal, gonad, pancreatic islet cells, parathyroid, pituitary, thyroid) and non-endocrine (gastrointestinal, integumentary, lymphatic) tissues.",
    "Bardet-Biedl Syndrome 1": "A Bardet-Biedl syndrome that has material basis in homozygous mutation in the BBS1 gene on chromosome 11q13.",
    "Bardet\u2013Biedl syndrome 2": "Any Bardet-Biedl syndrome in which the cause of the disease is a mutation in the BBS2 gene.",
    "Basal ganglia disease, biotin-responsive": "Biotin-thiamine-responsive basal ganglia disease is a disorder that affects the nervous system, including a group of structures in the brain called the basal ganglia, which help control movement. As its name suggests, the condition may improve if the vitamins biotin and thiamine are given as treatment. Without early and lifelong vitamin treatment, people with biotin-thiamine-responsive basal ganglia disease experience a variety of neurological problems that gradually get worse. The occurrence of specific neurological problems and their severity vary even among affected individuals within the same family.",
    "Beta-Hemoglobinopathies": "Beta-Hemoglobinopathies are the most common genetic disorders worldwide and are caused by mutations affecting the production or the structure of adult hemoglobin. Patients affected by these diseases suffer from anemia, impaired oxygen delivery to tissues, and multi-organ damage. In the absence of a compatible donor for allogeneic bone marrow transplantation, the lifelong therapeutic options are symptomatic care, red blood cell transfusions and pharmacological treatments.",
    "Biotinidase Deficiency": "Biotinidase deficiency is a late-onset form of multiple carboxylase deficiency, an inborn error of biotin metabolism that, if untreated, is characterized by seizures, breathing difficulties, hypotonia, skin rash, alopecia, hearing loss and delayed development.",
    "Bloom Syndrome": "Bloom syndrome (BSyn) is a rare chromosomal breakage syndrome characterized by a marked genetic instability associated with pre- and postnatal growth retardation, facial sun-sensitive telangiectatic erythema, increased susceptibility to infections, and predisposition to cancer.",
    "Canavan Disease": "A neurodegenerative disorder; its spectrum varies between severe forms with leukodystrophy, macrocephaly and severe developmental delay, and a very rare mild/juvenile form characterized by mild developmental delay.",
    "Carnitine palmitoyltransferase II deficiency, infantile": "Carnitine palmitoyltransferase II deficiency is a condition that prevents the body from using certain fats for energy, particularly during periods without food. The severe infantile hepatocardiomuscular form of CPT II deficiency affects the liver, heart, and muscles. Signs and symptoms usually appear within the first year of life. This form involves recurring episodes of hypoketotic hypoglycemia, seizures, an enlarged liver, cardiomyopathy, and arrhythmia.",
    "Cerebral creatine deficiency syndrome 1": "X-linked creatine transporter deficiency (CRTR-D) is a creatine deficiency syndrome characterized clinically by global developmental delay/ intellectual disability (DD/ID) with prominent speech/language delay, autistic behavior and seizures.",
    "Cerebrotendinous Xanthomatosis": "Cerebrotendinous xanthomatosis (CTX) is an anomaly of bile acid synthesis characterized by neonatal cholestasis, childhood-onset cataract, adolescent to young adult-onset tendon xanthomata, and brain xanthomata with adult-onset neurologic dysfunction.",
    "Congenital Adrenal Hyperplasia, 21-hydroxylase-deficient": "The most common form of congenital adrenal hyperplasia (CAH), characterized by simple virilizing or salt wasting forms that can manifest with genital ambiguity in females and with adrenal insufficiency (in both sexes), and that presents with dehydration, hypoglycemia in the neonatal period (that can be lethal if untreated), and hyperandrogenia.",
    "Congenital Disorder of Glycosylation, Type 1A": "PMM2-CDG is the most frequent form of congenital disorder of N-glycosylation and is characterized by cerebellar dysfunction, abnormal fat distribution, inverted nipples, strabismus and hypotonia. 3 forms of PMM2-CDG can be distinguished: the infantile multisystem type, late-infantile and childhood ataxia-intellectual disability type (3-10 yrs old), and the adult stable disability type. Infants usually develop ataxia, psychomotor delay and extraneurological manifestations including failure to thrive, enteropathy, hepatic dysfunction, coagulation abnormalities and cardiac and renal involvement. The phenotype is however highly variable and ranges from infants who die in the first year of life to mildly involved adults.",
    "Congenital Finnish Nephrosis": "Congenital Finnish Nephrosis is an inherited condition that prevents the kidneys from filtering protein out of the urine. Symptoms of the disease begin in the first days or weeks after birth. Infants are often born prematurely with a low birth weight. High levels of protein in the blood, combined with kidney failure, cause the body to swell with excess fluid. Frequent infections and potentially harmful blood clots can also develop.",
    "Congenital hydrocephalus 1": "Congenital hydrocephalus 1 is any congenital hydrocephalus in which the cause of the disease is a mutation in the CCDC88C gene. Congenital hydrocephalus is characterized by extensive accumulation of cerebrospinal fluid within the ventricles of the brain due to an imbalance between synthesis and absorption of cerebrospinal fluid.",
    "Congenital myotonia, autosomal recessive form": "Autosomal recessive Myotonia congenita (Becker's disease) is caused by mutations in the CLCN1 gene. The condition is characterized by muscle stiffness during sustained muscle contraction and variable degree of muscle weakness that tends to improve with repeated contractions.",
    "Cystic Fibrosis": "Cystic fibrosis (CF) is a genetic disorder characterized by the production of sweat with a high salt content and mucus secretions with an abnormal viscosity.",
    "Developmental and epileptic encephalopathy 1": "Any early infantile epileptic encephalopathy in which the cause of the disease is a mutation in the ARX gene.",
    "Diabetes mellitus, permanent neonatal 3": "",
    "Dihydrolipoamide Dehydrogenase Deficiency": "Pyruvate dehydrogenase E3 deficiency is a very rare subtype of pyruvate dehydrogenase deficiency (PDHD) characterized by either early-onset lactic acidosis and delayed development, later-onset neurological dysfunction or liver disease.",
    "Donnai\u2013Barrow syndrome": "Donnai-Barrow syndrome (DBS) is a rare, often severe, multiple congenital malformation syndrome with typical facial dysmorphism, ocular findings, hearing loss, agenesis of the corpus callosum, and variable intellectual disability. Congenital diaphragmatic hernia (CDH) and/or omphalocele are common.",
    "Dysautonomia, familial": "An acute or chronic disorder, affecting the sympathetic or parasympathetic nervous system. It can be primary, the result of central nervous system degeneration, or secondary due to diabetes or alcoholism. Patients with the chronic form of this disorder usually have a progressive clinical course and a poor prognosis.",
    "Ehlers-Danlos syndrome, classic-like, 1": "Ehlers-Danlos syndromes (EDS) form a heterogeneous group of inherited connective tissue disorders characterized by variable joint hypermobility and cutaneous hyperextensibility. Type X is distinguished by platelet dysfunction associated with a fibronectin abnormality. Type X EDS has been described in only one family so far. Age of onset is about 13-25 years. Transmission is autosomal recessive.",
    "Ellis-van Creveld Syndrome": "Ellis-van Creveld syndrome (EVC) is a skeletal and ectoderlam dysplasia characterized by a tetrad of short stature, postaxial polydactyly, ectodermal dysplasia, and congenital heart defects.",
    "Fabry disease": "Fabry disease (FD) is a progressive, inherited, multisystemic lysosomal storage disease characterized by specific neurological, cutaneous, renal, cardiovascular, cochleo-vestibular and cerebrovascular manifestations.",
    "Fanconi anemia, complementation group C": "Fanconi anemia caused by mutations of the FANCC gene. This gene provides instructions for making a protein that delays the onset of apoptosis and promotes homologous recombination repair of damaged DNA.",
    "Fragile X syndrome": "A genetic syndrome caused by mutations in the FMR1 gene which is responsible for the expression of the fragile X mental retardation 1 protein. This protein participates in neural development. This syndrome is manifested with mental, emotional, behavioral, physical, and learning disabilities.",
    "Fraser syndrome": "Fraser syndrome is a rare clinical entity including as main characteristics cryptophthalmos and syndactyly.",
    "Friedreich ataxia": "Any Friedreich ataxia in which the cause of the disease is a mutation in the FXN gene.",
    "Galactosemia": "Galactosemia is a group of rare genetic metabolic disorders characterized by impaired galactose metabolism resulting in a range of variable manifestations encompassing a severe, life-threatening disease (classic galactosemia), a rare mild form (galactokinase deficiency) causing cataract, and a very rare form with variable severity (galactose epimerase deficiency) resembling classic galactosemia in the severe form.",
    "Gaucher Disease": "Fetal Gaucher disease is the perinatal lethal form of Gaucher disease (GD).",
    "Glycogen Storage Disease, Type IA": "Glycogenosis due to glucose-6-phosphatase deficiency (G6P) type a, or glycogen storage disease (GSD) type 1a, is a type of glycogenosis due to G6P deficiency.",
    "Glycogen Storage Disease, Type IB": "A type of glycogenosis due to G6P deficiency.",
    "Glycogen Storage Disease, Type II": "Glycogen storage disease due to acid maltase deficiency (AMD) is an autosomal recessive trait leading to metabolic myopathy that affects cardiac and respiratory muscles in addition to skeletal muscle and other tissues. AMD represents a wide spectrum of clinical presentations caused by an accumulation of glycogen in lysosomes: Glycogen storage disease due to acid maltase deficiency, infantile onset, non-classic infantile onset and adult onset. Early onset forms are more severe and often fatal.",
    "Glycogen Storage Disease, Type IV": "",
    "Hemophagocytic lymphohistiocytosis, familial, 2": "Any genetic hemophagocytic lymphohistiocytosis in which the cause of the disease is a mutation in the PRF1 gene.",
    "Hemophilia A": "The most common form of hemophilia characterized by spontaneous or prolonged hemorrhages due to factor VIII deficiency.",
    "Hemophilia B": "Hemophilia B is a form of hemophilia characterized by spontaneous or prolonged hemorrhages due to factor IX deficiency.",
    "Hereditary fructosuria": "Hereditary fructosuria is a rare autosomal recessive disorder of fructose metabolism caused by a deficiency of fructokinaseenzyme activity. It is characterized by elevated fructosemia and presence of fructosuria following ingestion of fructose and related sugars (sucrose, sorbitol). Essential fructosuria is clinically asymptomatic and harmless. Dietary restriction is not indicated.",
    "Hermansky-Pudlak Syndrome 1": "Any Hermansky-Pudlak syndrome in which the cause of the disease is a mutation in the HPS1 gene.",
    "Hermansky-Pudlak Syndrome 3": "Any Hermansky-Pudlak syndrome in which the cause of the disease is a mutation in the HPS3 gene.",
    "Homocystinuria, B6 responsive and nonresponsive": "Homocystinuria caused by cystathionine Beta-synthase (CBS) deficiency is characterized by involvement of the eye (ectopia lentis and/or severe myopia), skeletal system (excessive height, long limbs, scolioisis, and pectus excavatum), vascular system (thromboembolism), and CNS (developmental delay/intellectual disability). All four or only one of the systems can be involved; expressivity is variable for all of the clinical signs. It is not unusual for a previously asymptomatic individual to present in adult years with only a thromboembolic event that is often cerebrovascular. Two phenotypic variants are recognized, B6-responsive homocystinuria and B6-non-responsive homocystinuria. B6-responsive homocystinuria is usually milder than the non-responsive variant.",
    "Huntington Disease": "Huntington disease is an autosomal dominant neurodegenerative disorder characterized by progressive motor dysfunction, cognitive decline, and psychiatric disturbances. Onset typically occurs in mid-adulthood, though juvenile forms are also recognized. The condition is caused by a pathogenic expansion of CAG trinucleotide repeats in the HTT gene.",
    "Hydrocephalus due to congenital stenosis of aqueduct of Sylvius": "",
    "Hyper-IgD syndrome": "Hyperimmunoglobinemia D with periodic fever (HIDS) is a rare autoinflammatory disease characterized by periodic attacks of fever and a systemic inflammatory reaction (cervical lymphadenopathy, abdominal pain, vomiting, diarrhea, arthralgias and skin signs).",
    "Hyperoxaluria, Primary, Type 1": "A rare disorder of glyoxylate metabolism characterized by the accumulation of oxalate due to a deficiency of the peroxisomal hepatic enzyme L-alanine: glyoxylate aminotransferase (AGT). Clinical presentation is variable, ranging from occasional symptomatic nephrolithiasis to nephrocalcinosis and end-stage renal disease with systemic involvement.",
    "Hypophosphatasia": "Hypophosphatasia (HPP) is a rare heritable metabolic disorder characterized by defective mineralization of bone and/or teeth in the presence of reduced activity of unfractionated serum alkaline phosphatase (ALP). The clinical spectrum is extremely wide, from stillbirth at one end to fractures of the lower extremities in adulthood, at the other, or even no bone manifestations (odontohypophosphatasia).",
    "INTELLECTUAL DEVELOPMENTAL DISORDER, X-LINKED": "An X-linked intellectual deficiency in which not enough information is known, reported or published to indicate whether a gene causes non-syndromic or syndromic presentations.",
    "Joubert Syndrome 2": "Any Joubert syndrome in which the cause of the disease is a mutation in the TMEM216 gene.",
    "Joubert syndrome 3": "Any Joubert syndrome in which the cause of the disease is a mutation in the AHI1 gene.",
    "Joubert syndrome 9": "Any Joubert syndrome in which the cause of the disease is a mutation in the CC2D2A gene.",
    "Leber congenital amaurosis 10": "Any Leber congenital amaurosis in which the cause of the disease is a mutation in the CEP290 gene.",
    "Maple Syrup Urine Disease": "An autosomal recessive inherited disorder caused by mutations in the BCKDHA, BCKDHB, DBT, and DLD genes. It is characterized by a deficiency of branched-chain alpha-keto acid dehydrogenase complex, leading to accumulation of metabolites in the body fluids. The name of the disease derives from the sweet odor of the urine in infants, reminiscent of maple syrup. Signs and symptoms usually appear in infancy and include lethargy and developmental delays. If untreated, it may lead to seizures, coma, and death.",
    "Medium Chain Acyl-CoA Dehydrogenase Deficiency": "Medium chain acyl-CoA dehydrogenase (MCAD) deficiency (MCADD) is an inborn error of mitochondrial fatty acid oxidation characterized by a rapidly progressive metabolic crisis, often presenting as hypoketotic hypoglycemia, lethargy, vomiting, seizures and coma, which can be fatal in the absence of emergency medical intervention.",
    "Megalencephalic leukoencephalopathy with subcortical cysts": "Megalencephalic leukoencephalopathy with subcortical cysts (MLC) is a form of leukodystrophy that is characterized by infantile-onset macrocephaly, often with mild neurologic signs at presentation (such as mild motor delay), which worsen with time, leading to poor ambulation, falls, ataxia, spasticity, increasing seizures and cognitive decline. Brain magnetic resonance imaging reveals diffusely abnormal and mildly swollen white matter as well as subcortical cysts in the anterior temporal and frontoparietal regions.",
    "Metachromatic Leukodystrophy": "Metachromatic leukodystrophy is an inherited condition characterized by the accumulation of fats called sulfatides in cells, especially cells of the nervous system. This accumulation results in progressive destruction of white matter of the brain, which consists of nerve fibers covered by myelin.Affected individuals experience progressive deterioration of intellectual functions and motor skills, such as the ability to walk. They also develop loss of sensation in the extremities, incontinence, seizures, paralysis, inability to speak, blindness, and hearing loss. Eventually they lose awareness of their surroundings and become unresponsive. This condition is inherited in an autosomal recessive pattern and is caused by mutations in the ARSA and PSAP genes.",
    "Methylmalonic aciduria due to methylmalonyl-CoA mutase deficiency": "Vitamin B12-unresponsive methylmalonic acidemia is an inborn error of vitamin B12 (cobalamin) metabolism characterized by recurrent ketoacidotic crises or transient vomiting, dehydration, hypotonia and intellectual deficit, which does not respond to administration of vitamin B12. There are two types of vitamin B12-unresponsive methylmalonic acidemia: mut0 and mut-.",
    "Methylmalonic aciduria with homocystinuria cblC type": "A form of methylmalonic acidemia with homocystinuria, an inborn error of vitamin B12 (cobalamin) metabolism characterized by megaloblastic anemia, lethargy, failure to thrive, developmental delay, intellectual deficit and seizures. cblC type methylmalonic acidemia with homocystinuria is caused by mutations in the MMACHC gene (1p36.3) and is transmitted in an autosomal recessive manner.",
    "Mitochondrial DNA depletion syndrome 4A": "Alpers Huttenlocher syndrome (AHS) is a cerebrohepatopathy and a rare and severe form of mitochondrial DNA (mtDNA) depletion syndrome characterized by the triad of progressive developmental regression, intractable seizures, and hepatic failure.",
    "Mitochondrial complex IV deficiency, nuclear type 2": "Any fatal infantile encephalocardiomyopathy in which the cause of the disease is a mutation in the SCO2 gene.",
    "Mucolipidosis II": "Mucolipidosis II (MLII) is a slowly progressive lysosomal disorder characterized by growth retardation, skeletal abnormalities, facial dysmorphism, stiff skin, developmental delay and cardiomegaly.",
    "Mucolipidosis, Type IV": "A lysosomal storage disease characterised clinically by psychomotor retardation and visual abnormalities including corneal clouding, retinal degeneration, or strabismus.",
    "Mucopolysaccharidosis, Ih (Hurler S)": "The mucopolysaccharidoses are a group of inherited disorders caused by a lack of specific lysosomal enzymes involved in the degradation of glycosaminoglycans (GAGs), or mucopolysaccharides. The accumulation of partially degraded GAGs causes interference with cell, tissue, and organ function. Deficiency of alpha-L-iduronidase can result in a wide range of phenotypic involvement with 3 major recognized clinical entities: Hurler (MPS IH; 607014), Scheie (MPS IS; 607016), and Hurler-Scheie (MPS IH/S) syndromes. Hurler and Scheie syndromes represent phenotypes at the severe and mild ends of the MPS I clinical spectrum, respectively, and the Hurler-Scheie syndrome is intermediate in phenotypic expression.",
    "Muscular dystrophy, Becker type": "Becker muscular dystrophy (BMD) is a neuromuscular disease characterized by progressive muscle wasting and weakness due to degeneration of skeletal, smooth and cardiac muscle.",
    "Muscular dystrophy\u2013dystroglycanopathy, type A, 5": "Congenital muscular dystrophy-dystroglycanopathy with brain and eye anomalies (type A), which includes both the more severe Walker-Warburg syndrome (WWS) and the slightly less severe muscle-eye-brain disease (MEB), is an autosomal recessive disorder with characteristic brain and eye malformations, profound mental retardation, congenital muscular dystrophy, and death usually in the first years of life.",
    "Myasthenic syndrome, congenital, 4A, slow-channel": "A congenital myasthenic syndrome characterized by postsynaptic neuromuscular junction defects, early-onset progressive muscle weakness, and prolonged opening and activity of the acetylcholine receptor channel that has material basis in heterozygous or rarely biallelic mutation in the CHRNE gene on chromosome 17p13.",
    "Nemaline myopathy 2": "An autosomal recessive inherited myopathy caused by mutations in the NEB gene. It is characterized by generalized hypotonia and skeletal muscle weakness.",
    "Niemann-Pick Disease, Types A": "Type C Niemann-Pick disease associated with a mutation in the gene NPC1, encoding Niemann-Pick C1 protein.",
    "Non-Syndromic Hearing Loss": "Nonsyndromic hearing loss is a partial or total loss of hearing that is not associated with other signs and symptoms. Nonsyndromic hearing loss can be classified in several different ways. One common way is by the condition's pattern of inheritance: autosomal dominant (DFNA), autosomal recessive (DFNB), X-linked (DFNX), or mitochondrial (which does not have a special designation). Each of these types of hearing loss includes multiple subtypes. DFNA, DFNB, and DFNX subtypes are numbered in the order in which they were first described. For example, DFNA1 was the first type of autosomal dominant nonsyndromic hearing loss to be identified.",
    "Oculocutaneous Albinism, Type 1": "Type 1 oculocutaneous albinism (OCA1) describes a group of tyrosine related OCAs that includes OCA1A, OCA1B, type 1 minimal pigment oculocutaneous albinism (OCA1-MP) and type 1 temperature sensitive oculocutaneous albinism (OCA1-TS).",
    "Oculocutaneous albinism brown and type II": "Oculocutaneous albinism type 2 (OCA2) is a type of OCA and the most common form of OCA seen in the African population, characterized by variable hypopigmentation of the skin and hair, numerous characteristic ocular changes and misrouting of the optic nerves at the chiasm.",
    "Opitz GBBB syndrome, type I": "X-linked form of Opitz G/BBB syndrome.",
    "Ornithine transcarbamylase deficiency": "Ornithine transcarbamylase deficiency (OTCD) is a disorder of urea cycle metabolism and ammonia detoxification characterized by either a severe, neonatal-onset disease found almost exclusively in males, or later-onset (partial) forms of the disease. Both present with episodes of hyperammonemia that can be fatal and which can lead to neurological complications.",
    "Pendred Syndrome": "Pendred syndrome (PDS) is a clinically variable genetic disorder characterized by bilateral sensorineural hearing loss and euthyroid goiter.",
    "Phenylketonuria": "Phenylketonuria (PKU) is the most common inborn error of amino acid metabolism and is characterized by mild to severe mental disability in untreated patients.",
    "Polycystic Kidney Disease, Autosomal Recessive": "Autosomal recessive polycystic kidney disease (ARPKD) is an inherited disorder characterised by the development of cysts affecting the collecting ducts. It is frequently associated with hepatic involvement.",
    "Pontocerebellar Hypoplasia, Type 6": "Pontocerebellar hypoplasia type 6 (PCH6) is a rare form of pontocerebellar hypoplasia characterized clinically at birth by hypotonia, clonus, epilepsy impaired swallowing and from infancy by progressive microencephaly, spasticity and lactic acidosis.",
    "Primary microcephaly 1, recessive": "Any autosomal recessive primary microcephaly in which the cause of the disease is a mutation in the MCPH1 gene.",
    "Recessive dystrophic epidermolysis bullosa": "Recessive dystrophic epidermolysis bullosa (RDEB)-generalized other, also known as RDEB non-Hallopeau-Siemens type, is a subtype of DEB characterized by generalized cutaneous and mucosal blistering that is not associated with severe deformities.",
    "Retinitis Pigmentosa 59": "Any retinitis pigmentosa in which the cause of the disease is a mutation in the DHDDS gene.",
    "Retinitis pigmentosa 3": "Any retinitis pigmentosa in which the cause of the disease is a mutation in the RPGR gene.",
    "Retinoschisis 1, X-linked, juvenile": "A genetic ocular disease that is characterized by reduced visual acuity in males due to juvenile macular degeneration.",
    "Schindler disease, type 1": "Alpha-N-acetylgalactosaminidase (NAGA) deficiency type 1 is a very rare and severe type of NAGA deficiency characterized by infantile neuroaxonal dystrophy.",
    "Short-rib thoracic dysplasia 3 with or without polydactyly": "An asphyxiating thoracic dystrophy that has material basis in homozygous or compound heterozygous mutation in the DYNC2H1 gene on chromosome 11q22.",
    "Smith-Lemli-Opitz Syndrome": "Smith-Lemli-Opitz syndrome (SLOS) is characterized by multiple congenital anomalies, intellectual deficit, and behavioral problems.",
    "Spastic paraplegia 2, X-linked": "Spastic paraplegia type 2 (SPG2) is an X-linked leukodystrophy characterized primarily by spastic gait and autonomic dysfunction. When additional central nervous system (CNS) signs, such as intellectual deficit, ataxia, or extrapyramidal signs, are present, the syndrome is referred to as complicated SPG.",
    "Spinal muscular atrophy": "A rare, genetic, neuromuscular disease characterized by proximal muscle weakness with an early involvement of foot and hand muscles following normal motor development in early childhood, a rapidly progressive disease course leading to generalized areflexic tetraplegia with contractures, severe scoliosis, hyperlordosis, and progressive respiratory insufficiency leading to assisted ventilation. Cranial nerve functions are normal and tongue wasting and fasciculations are absent. Milder phenotype with a moderate generalized weakness and slower disease progress was reported.",
    "Spinocerebellar Ataxia Type 1": "Spinocerebellar ataxia type 1 (SCA1) is a neurodegenerative disorder characterized by progressive cerebellar ataxia, typically presenting with impaired coordination and balance. Additional clinical features may include dysarthria, dysphagia, spasticity, and ophthalmoplegia.",
    "Spinocerebellar ataxia 10": "Spinocerebellar ataxia type 10 (SCA10) is a subtype of type I autosomal dominant cerebellar ataxia (ADCA type I). It is characterized by slowly progressive cerebellar syndrome and epilepsy, sometimes mild pyramidal signs, peripheral neuropathy and neuropsychological disturbances.",
    "Stargardt Disease, Type 1": "Severe early childhood onset retinal dystrophy (SECORD) is an inherited retinal dystrophy, characterized by a severe congenital night blindness, progressive retinal dystrophy and nystagmus. Best corrected visual acuity can reach 0.3 in the first decade of life and can pertain well into the second decade of life. Blindness is often complete by the age of 30 years. An overlap with Leber congenital amaurosis (LCA) occurs when patients are characterized by their visual acuity and panretinal dystrophy.",
    "Surfactant metabolism dysfunction, pulmonary 3": "Interstitial lung disease due to ABCA3 deficiency is a rare genetic respiratory disease characterized by a variable clinical outcome ranging from a fatal respiratory distress syndrome in the neonatal period to chronic interstitial lung disease developing in infancy or childhood with chronic cough, rapid breathing, shortness of breath and recurrent pulmonary infections. Clinical manifestations of respiratory failure include grunting, intercostal retractions, nasal flaring, cyanosis, and progressive dyspnea.",
    "Tay-Sachs Disease": "GM2 gangliosidosis, AB variant is an extremely rare, severe genetic disorder characterized by progressive neurological decline due to ganglioside activator deficiency.",
    "Trimethylaminuria": "A rare inborn error of metabolism characterized by the presence of large amounts of trimethylamine in urine, sweat, and breath, resulting in a fishy body odor in affected individuals.",
    "Tyrosinemia, Type I": "Tyrosinemia type 1 (HTI) is an inborn error of tyrosine catabolism caused by defective activity of fumarylacetoacetate hydrolase (FAH) and is characterized by progressive liver disease, renal tubular dysfunction, porphyria-like crises and a dramatic improvement in prognosis following treatment with nitisinone.",
    "Usher Syndrome 3a": "Any Usher syndrome in which the cause of the disease is a mutation in the CLRN1 gene.",
    "Usher Syndrome, Type 1F": "A form of Usher syndrome type IF that can be caused by homozygous or compound heterozygous mutation in the protocadherin-15 gene (PCDH15) on chromosome 10q. It is inherited in an autosomal recessive manner.",
    "Usher Syndrome, Type 2A": "Any Usher syndrome in which the cause of the disease is a mutation in the USH2A gene.",
    "Very Long-Chain Acyl-CoA Dehydrogenase Deficiency": "An inherited disorder of mitochondrial long-chain fatty acid oxidation with a variable presentation including: cardiomyopathy, hypoketotic hypoglycemia, liver disease, exercise intolerance and rhabdomyolysis.",
    "Vitamin D-dependent rickets type 1A": "",
    "Walker-Warburg Syndrome, FKTN-Related": "Walker-Warburg syndrome is an inherited disorder that affects development of the muscles, brain, and eyes. It is the most severe of a group of genetic conditions known as congenital muscular dystrophies, which cause muscle weakness and wasting (atrophy) beginning very early in life. The signs and symptoms of Walker-Warburg syndrome are present at birth or in early infancy. Because of the severity of the problems caused by Walker-Warburg syndrome, most affected individuals do not survive past age 3.",
    "Wilson Disease": "A very rare inherited multisystemic disease presenting non-specific neurological, hepatic, psychiatric or osseo-muscular manifestations due to excessive copper deposition in the body.",
    "Xeroderma Pigmentosum Group C": "An autosomal recessive inherited disorder caused by mutations in the XPC gene. This disease is characterized by increased sensitivity to sunlight with the development of carcinomas at an early age and is caused by a defect in nucleotide excision repair.",
    "Xeroderma Pigmentosum Group D": "Any xeroderma pigmentosum in which the cause of the disease is a mutation in the ERCC2 gene.",
    "\u0251-Methylacetoacetic aciduria": "Beta-ketothiolase (T2) deficiency is a rare organic aciduria affecting ketone body metabolism and the catabolism of isoleucine and characterized by intermittent ketoacidotic episodes associated with vomiting, dyspnea, tachypnoea, hypotonia, lethargy and coma, with an onset during infancy or toddlerhood and usually ceasing by adolescence."
}

const VariantRecordSet = "Variant Record Set";
const StrRecordSet = "Str Record Set";
const OutputDirectory = "Output Directory";
const SupportingFiles = "Supporting Files";

/** @type {ProjectReport} */
export default {
    description: 'Export PGx JSON Report',
    parameters: [
        {
            name: VariantRecordSet,
            type: 'RecordSet',
            props: {
                recordType: 'VARIANT',
            },
            value: ""
        },
        {
            name: StrRecordSet,
            type: 'RecordSet',
            props: {
                recordType: 'VARIANT',
            },
            value: ""
        },
        {
            name: OutputDirectory,
            type: 'Directory',
            value: '%ProjectPath%/workflows/str_report'
        },
        {
            name: SupportingFiles,
            type: 'Directory',
        },
    ],
    async run({ api, args, parameters }) {
        const [sampleId] = args;

        /** @type {ApiProjectReport} */
        const tableApi = api;

        // Load input parameters
        const outFolder = parameters.find(p => p.name === OutputDirectory);
        const inputFolder = parameters.find(p => p.name === SupportingFiles);
        const variantRecordSetId = parameters.find(p => p.name === VariantRecordSet);
        const strRecordSetId = parameters.find(p => p.name === StrRecordSet);
        if (outFolder.value == null) {
            console.error("Missing parameter output directory");
            return;
        }

        if (inputFolder.value == null) {
            console.error("Missing parameter supporting file directory");
            return;
        }

        if (variantRecordSetId.value == null) {
            console.error("Missing parameter variant record set");
            return;
        }

        if (strRecordSetId.value == null) {
            console.error("Missing parameter STR record set");
            return;
        }

        // Load record sets
        const allRecordSets = await api.recordSetDetails();

        const variantRecordSet = allRecordSets.find(r => r.id === variantRecordSetId.value);
        if (variantRecordSet == null) {
            console.error(`Record set ${variantRecordSetId.value} not found`);
            return;
        }

        const strRecordSet = allRecordSets.find(r => r.id === strRecordSetId.value);
        if (strRecordSet == null) {
            console.error(`Record set ${strRecordSetId.value} not found`);
            return;
        }

        // Load Small Variants
        const projectTables = await tableApi.projectTables();
        let smallVariants = [];
        let selectedRecords = null;
        do {
            selectedRecords = await api.recordSetValues({ uuid: variantRecordSet.uuid, sampleId: variantRecordSet.sampleSpecific ? Number.parseInt(sampleId) : -1 });
            const recordIds = selectedRecords.setRecordIds;
            let smallVariantBuffer = [];
            for (const table of projectTables) {
                if (table.uuid !== variantRecordSet.tableUuid) {
                    continue;
                }

                const sources = await tableApi.projectTableSources({ uuid: table.uuid });
                for (let sourceIdx = 0; sourceIdx < sources.length; sourceIdx++) {
                    const source = sources[sourceIdx];
                    if (table.type === "variant") {
                        if (source.algKey === "variants" && sourceIdx === 0) {
                            const tableVariants = await loadSmallVariants(source, tableApi, sampleId, recordIds);
                            smallVariantBuffer.push(...tableVariants);
                        }
                        if (source.algKey === "transcript") {
                            smallVariantBuffer = await annotateVariants(smallVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                        if (source.algKey === "acmgclassifier") {
                            smallVariantBuffer = await annotateAcmg(smallVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                        if (source.algKey === "zygosity") {
                            smallVariantBuffer = await annotateVariants(smallVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                        if (source.algKey === "ClinVar-NCBI") {
                            smallVariantBuffer = await annotateClinVarClassification(smallVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                    }
                }
            }
            smallVariants.push(...smallVariantBuffer);
        } while (selectedRecords.hasMore)

        smallVariants = smallVariants.filter(g => g["GeneNames"] != null).map(fillVariantDetails);

        // Load STR Variants
        let strVariants = [];
        selectedRecords = null;
        do {
            selectedRecords = await api.recordSetValues({ uuid: strRecordSet.uuid, sampleId: strRecordSet.sampleSpecific ? Number.parseInt(sampleId) : -1 });
            const recordIds = selectedRecords.setRecordIds;
            let strVariantBuffer = [];
            for (const table of projectTables) {
                if (table.uuid !== strRecordSet.tableUuid) {
                    continue;
                }

                const sources = await tableApi.projectTableSources({ uuid: table.uuid });
                for (let sourceIdx = 0; sourceIdx < sources.length; sourceIdx++) {
                    const source = sources[sourceIdx];
                    const fieldSymbols = source.fields.map(f => f.symbol);
                    if (table.type === "variant") {
                        if (source.algKey === "variants" && sourceIdx === 0) {
                            if (fieldSymbols.includes("MOTIFS")) {
                                const tableStrVariants = await loadPacBioStrVariants(source, tableApi, sampleId, recordIds);
                                strVariantBuffer.push(...tableStrVariants);
                            } else {
                                const tableStrVariants = await loadExpansionHunterStrVariants(source, tableApi, sampleId, recordIds);
                                strVariantBuffer.push(...tableStrVariants);
                            }
                        }
                        if (source.algKey === "STRchive") {
                            strVariantBuffer = await annotateVariants(strVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                        if (source.algKey === "transcript") {
                            strVariantBuffer = await annotateVariants(strVariantBuffer, source, tableApi, sampleId, recordIds);
                        }
                    }
                }
            }
            strVariants.push(...strVariantBuffer);
        } while (selectedRecords.hasMore)
        
        // Load sample state
        let sampleState = {};
        for (const table of projectTables) {
            const sources = await tableApi.projectTableSources({ uuid: table.uuid });
            for (const source of sources) {       
                if(source.algKey === "setsamples") {
                    // load sample data
                    const records = await loadTableRecords(source, tableApi, sampleId, null);
                    if(records.length > 0) {
                        sampleState = loadSampleState(records[sampleId]);
                        console.log(`Rendering Report for Sample: ${sampleState.sampleName ?? sampleId}`);
                    }
                }
            }
        }

        strVariants.forEach(v => {
            if(sampleState.sex === "Female") {
                v.xChromosomeCount = 2;
            } else {
                // TODO: not sure how to handle unknown sex
                // TODO: probably need to handle PAR regions differently
                v.xChromosomeCount = 1;
            }
        });

        // Load coverage table
        let coverageStats = [];
        for (const table of projectTables) {
            const sources = await tableApi.projectTableSources({ uuid: table.uuid });
            for (const source of sources) {
                if (table.type === "coverage" && source.algKey === "coveragestatistics") {
                    // load sample data
                    coverageStats = await loadTableRecords(source, tableApi, sampleId, null)
                    coverageStats.forEach(region => {
                        region.Name = region.Name.replace("ID=", "");
                        region.Region = `${region.SEGMENT_CHR}:${region.SEGMENT_START}-${region.SEGMENT_STOP}`;
                    });
                }
            }
        }

        // Load structural variants
        const pacBioJsonFile = `${inputFolder.value}/${sampleState.sampleName}.qc.json`;
        const structuralVariants = loadPacBioStructuralVariants(pacBioJsonFile, sampleState.sex);

        // Construct repeat genotypes
        const strGenotypes = getStrGenotypes(strVariants);
        
        // A set of genotypes with classification
        const strGenotypesFiltered = strGenotypes.filter(g => StrDetailInclusionClassifications.includes(g.classification));
        const reportedRegionDetails = getReportedRegionDetails(smallVariants, structuralVariants, strGenotypesFiltered);
        const supportingImages = strGenotypesFiltered.map(genotype => {
            const svgFile = `${inputFolder.value}/motifs_allele.trgt_plots/${sampleState.sampleName}.motifs_allele.${genotype.trid}.trgt_plot.svg`;
            const motifPlot = loadMotifPlot(svgFile, genotype.gene); 

            if (motifPlot == null) {
                return null;
            }

            const title = `<b>${genotype.trid} ${genotype.transcript} ${genotype.motif}:</b> ${genotype.motifCount1} ${genotype.motifCount2}`;
            return {
                title: title,
                image: motifPlot,

            }
        }).filter(img => img != null);

        const noSignificantFindings = structuralVariants.length === 0 && smallVariants.length === 0 && strGenotypesFiltered.length === 0;
        const templateData = {
            sampleId,
            sampleState,
            smallVariants,
            structuralVariants,
            strGenotypes,
            strGenotypesFiltered,
            noSignificantFindings,
            reportedRegionDetails,
            incidentalStrGenotypes: getIncidentalStrMotifs(strVariants, strGenotypes),
            supportingImages: supportingImages,
            coverageStats: coverageStats,
            citations: getCitations(strGenotypes, structuralVariants),
            repeatThresholds: getRepeatThresholds(strGenotypes),
        };

        const templateDir = await api.reportDirectory();
        const templateFile = templateDir + "/PacBioPureTarget.docx";
        const templateContent = fs.readFileSync(templateFile, 'binary');

        // report filters could be added but aren't currently needed
        const reportFileFilters = {
            formatClassification
        };

        // These aren't resolved for the pgx report
        const userFilters = undefined;

        const buf = runTemplateConvert(templateContent, templateData, systemFilters, userFilters, reportFileFilters);

        const fileName = `${outFolder.value}/${sampleState.sampleName}.docx`;
        fs.mkdirSync(outFolder.value, {recursive: true});
        fs.writeFileSync(fileName, buf, 'binary');
        return;
    }
}

function interpretParaphraseSMN1(smnData) {
    let cnvType = null;
    let interpretation = "";
    let detailsHtml = "";
    let classification = "Unknown";
    let pubMedIDs = [
        "21673580"
    ];
    let pubMedCitations = [
        `Prior, Thomas W., et al. "Technical standards and guidelines for spinal muscular atrophy testing." Genetics in Medicine 13.7 (2011): 686-694.`
    ];

    if (smnData.smn1_cn === 0) {
        cnvType = "Deletion";
        classification = "Pathogenic";
        interpretation = "Homozygous deletion of SMN1 detected, consistent with diagnosis of Spinal Muscular Atrophy (PMID: 21673580). This autosomal recessive neuromuscular disorder is characterized by progressive, symmetrical proximal muscle weakness resulting from degeneration and loss of alpha motor neurons in the anterior horn cells of the spinal cord and brainstem motor nuclei.";
        if (smnData.smn2_cn == null) {
            interpretation += " SMN2 copy number could not be determined unambiguously, which limits the ability to predict disease severity (PMID: 29433793).";
        } else {
            if (smnData.smn2_cn <= 2) {
                interpretation += ` SMN2 copy number of ${smnData.smn2_cn} suggests high risk for severe Type I or II SMA phenotype (PMID: 29433793).`;
            } else if (smnData.smn2_cn === 3) {
                interpretation += " SMN2 copy number of 3 suggests moderate risk for Type II-III SMA phenotype (PMID: 29433793).";
            } else if (smnData.smn2_cn >= 4) {
                interpretation += ` SMN2 copy number of ${smnData.smn2_cn} suggests milder Type III-IV SMA phenotype (PMID: 29433793).`;
            }
        }
    } else if (smnData.smn1_cn === 1) {
        cnvType = "Deletion";
        classification = "Intermediate";
        interpretation = "Single copy of SMN1 detected, consistent with carrier status for SMA (PMID: 21673580). ";
        interpretation += "No expected disease manifestation in the individual; however, there is a risk of transmitting the SMN1 deletion to offspring.";
    } else if (smnData.smn1_cn >= 2) {
        cnvType = "Normal";
        classification = "Benign";
        interpretation = "Normal SMN1 copy number detected. ";
        interpretation += "No increased risk for SMA identified.";
    } else {
        cnvType = "Unknown";
        interpretation = "SMN1 copy number could not be determined unambiguously. ";
        interpretation += "Clinical significance cannot be assessed without clear SMN1 copy number.";
    }

    if (smnData.smn1_cn != null) {
        detailsHtml = `<b>SMN1 Copy Number:</b> ${smnData.smn1_cn}`;
    }
    if (smnData.smn2_cn != null) {
        detailsHtml += `</br><b>SMN2 Copy Number:</b> ${smnData.smn2_cn}`;
    }

    if (interpretation.includes("29433793")) {
        pubMedIDs.push("29433793")
        pubMedCitations.push(`Calucho, Maite, et al. "Correlation between SMA type and SMN2 copy number revisited: an analysis of 625 unrelated Spanish patients and a compilation of 2834 reported cases." Neuromuscular Disorders 28.3 (2018): 208-215.`)
    }

    return {
        svType: cnvType,
        primaryGene: "SMN1",
        genes: "SMN1",
        interpretation,
        classification,
        detailsHtml,
        pubMedIDs,
        pubMedCitations
    };
}

function interpretParaphraseHBA(hbaData) {
    let cnvType = "Deletion";
    let interpretation = "";
    let detailsHtml = "";
    let classification = "Unknown";
    let clinicalCondition = "";
    let pubMedID = "21381239";
    let pubMedCitations = [`Galanello, Renzo, and Antonio Cao. "Alpha-thalassemia." Genetics in medicine 13.2 (2011): 83-88.`];

    if (hbaData.total_cn > 4) {
        cnvType = "Duplication";
        clinicalCondition = "Alpha Globin Gene Duplication";
        interpretation = `Results indicate increased alpha globin gene copy number (${hbaData.total_cn} copies total), consistent with alpha globin gene duplication. This finding is typically asymptomatic but, in rare cases, may exacerbate the clinical severity of beta thalassemia when co-inherited, due to increased imbalance between alpha and beta globin chain production `;
        classification = "Intermediate";
        pubMedID = "37928241";
        pubMedCitations = [`Xie, Xinxing, et al. "Prevalence and genetic analysis of triplicated α-globin gene in Ganzhou region using high-throughput sequencing." Frontiers in Genetics 14 (2023): 1267892.`];
    } else if (hbaData.total_cn === 4) {
        cnvType = "Normal";
        clinicalCondition = "Normal Alpha Globin";
        interpretation = "Normal alpha globin gene copy number detected (four copies total), with no evidence of alpha-thalassemia";
        classification = "Bengin";
    } else if (hbaData.total_cn === 3) {
        clinicalCondition = "Alpha Thalassemia Silent Carrier";
        interpretation = "Results indicate the loss of a single alpha globin gene (three copies detected), consistent with the alpha thalassemia silent carrier state. This genotype is typically asymptomatic but may occasionally be associated with mild microcytosis and hypochromia";
        classification = "Intermediate";
    } else if (hbaData.total_cn === 2) {
        clinicalCondition = "Alpha-Thalassemia Trait";
        interpretation = "Results indicate the presence of two residual functional alpha genes, consistent with the alpha-thalassemia trait. Most individuals with this trait are asymptomatic, though mild anemia may occasionally occur. The condition typically does not result in significant clinical complications. However, parents carrying the alpha-thalassemia trait can transmit the affected genes to their offspring, potentially increasing the risk of more severe forms of alpha-thalassemia, such as hemoglobin H disease or hydrops fetalis";
        classification = "Pathogenic";
    } else if (hbaData.total_cn === 1) {
        clinicalCondition = "Hemoglobin H Disease";
        interpretation = "Results indicate the presence of a single residual functioning alpha globin gene, consistent with Hemoglobin H (HbH) disease. This condition is characterized by an imbalance in globin chain production, leading to a relative excess of beta globin chains that form unstable β₄ tetramers (HbH). HbH disease demonstrates marked variability in both clinical presentation and hematologic findings. Common features include microcytic, hypochromic hemolytic anemia, hepatosplenomegaly, jaundice, and, in some cases, bone changes resembling those seen in moderate alpha thalassemia";
        classification = "Pathogenic";
    } else if (hbaData.total_cn === 0) {
        clinicalCondition = "Hemoglobin Bart Hydrops Fetalis Syndrome";
        interpretation = "Results indicate a complete loss of alpha globin gene expression (0 copies detected), consistent with Hemoglobin Bart's hydrops fetalis syndrome—the most severe form of alpha-thalassemia. In this condition, the fetus is unable to synthesize alpha globin chains necessary for the formation of fetal (HbF) and adult hemoglobin (HbA). The clinical presentation is characterized by profound anemia, marked hepatosplenomegaly, hydrops fetalis, and high-output cardiac failure. Additional congenital anomalies, particularly involving the cardiac, skeletal, and urogenital systems, have also been reported. This condition is typically incompatible with postnatal life, with most affected fetuses being stillborn or dying shortly after birth";
        classification = "Pathogenic";
    }

    interpretation += ` (PMID: ${pubMedID}).`

    detailsHtml = `<b>HBA1/HBA2 Copy Number:</b> ${hbaData.total_cn}</br>`;
    detailsHtml += `<b>Clinical Condition:</b> ${clinicalCondition}`;

    return {
        svType: cnvType,
        primaryGene: "HBA1",
        genes: "HBA1/HBA2",
        interpretation,
        classification,
        detailsHtml,
        pubMedIDs: [pubMedID],
        pubMedCitations,
    };
}

function interpretParaphraseCYP21A2(cyp21Data) {
    let cnvType = "Unknown";
    let interpretation = "";
    let detailsHtml = "";
    let classification = "Unknown";
    let pubMedID = "31333583";
    let pubMedCitations = [`Pignatelli, Duarte, et al. "The complexities in genotyping of congenital adrenal hyperplasia: 21-hydroxylase deficiency." Frontiers in Endocrinology 10 (2019): 432.`];
    
    if (cyp21Data.total_cn > 2) {
        cnvType = "Duplication";
        interpretation = `Increased copy number of the CYP21A2 gene detected (${cyp21Data.total_cn} copies), indicating a duplication of the CYP21A2 gene`;
        classification = "Benign";
    } else if (cyp21Data.total_cn === 2) {
        cnvType = "Normal";
        interpretation = "Normal copy number of the CYP21A2 gene detected (2 copies). This finding is consistent with the expected copy number in the general population";
        classification = "Benign";
    }  else if (cyp21Data.total_cn === 1) {
        cnvType = "Deletion";
        interpretation = "Only one copy of the CYP21A2 gene detected, suggesting a heterozygous deletion. This finding indicates carrier status for congenital adrenal hyperplasia. While there are some exceptions, most carriers are asymptomatic ";
        classification = "Intermediate";
    } else if (cyp21Data.total_cn === 0) {
        cnvType = "Deletion";
        interpretation = "No copies of the CYP21A2 gene detected, suggesting a complete deletion of both alleles. This finding is consistent with congenital adrenal hyperplasia. Symptoms may include adrenal insufficiency, genital ambiguity, short stature, androgen excess syndromes and infertility";
        classification = "Pathogenic";
    }

    interpretation += ` (PMID: ${pubMedID}).`

    detailsHtml = `<b>CYP21A2 Copy Number:</b> ${cyp21Data.total_cn}</br>`;

    return {
        svType: cnvType,
        primaryGene: "CYP21A2",
        genes: "CYP21A2",
        interpretation,
        classification,
        detailsHtml,
        pubMedIDs: [pubMedID],
        pubMedCitations,
    };
}

function interpretPacBioF8(f8inv1, f8inv22, sex) {
    const inv1 = f8inv1.f8_info;
    const inv22 = f8inv22.f8_info;
    let svType = "Unknown";
    let interpretation = "";
    let detailsHtml = "";
    let classification = "Unknown";
    let pubMedIDs = [];
    let pubMedCitations = [];
    const isMale = sex.toLowerCase().startsWith("m");


    if (isMale) {
        const maleDiseaseDescription = "Affected males typically present with spontaneous soft-tissue, muscular, and joint bleeding. In severe cases, where factor VIII (FVIII) activity is less than 1% of normal, patients are at risk of life-threatening complications, including intracranial hemorrhage (PMID: 36968612).";
        // Male sample
        if ((inv1.has_inversion) || (inv22.has_inversion)) {
            classification = "Pathogenic";
            pubMedIDs = [
                "29296938",
                "36968612"
            ];
            pubMedCitations = [
                `Dutta, Debargh, et al. "Accurate, simple, and inexpensive assays to diagnose F8 gene inversion mutations in hemophilia A patients and carriers." Blood Advances 1.3 (2016): 231-239.`,
                `Hu, Zhiqing, et al. "Correction of F8 intron 1 inversion in hemophilia A patient-specific iPSCs by CRISPR/Cas9 mediated gene editing." Frontiers in Genetics 14 (2023): 1115831.`
            ];
            if (inv22.has_inversion) {
                interpretation = "F8 Intron 22 inversion detected in hemizygous state. ";
                interpretation += "This finding is consistent with severe Hemophilia A. The intron 22 inversion accounts for approximately 45% of severe Hemophilia A cases (PMID: 29296938). ";
                interpretation += maleDiseaseDescription;
            }

            if (inv1.has_inversion) {
                if (interpretation) {
                    interpretation += " ";
                }
                interpretation += "F8 Intron 1 inversion detected in hemizygous state. ";
                interpretation += "This finding is consistent with severe Hemophilia A. The intron 1 inversion accounts for approximately 2-3% of severe Hemophilia A cases (PMID: 29296938). ";
                interpretation += maleDiseaseDescription;
            }
        } else {
            interpretation = "No F8 inversions detected. This does not rule out Hemophilia A, as other variants in F8 beyond intron 1/22 inversions can also cause this condition. Further genetic testing may be warranted if clinically indicated.";
        }
    } else {
        // Female sample
        // Check for homozygous state in either inversion
        const inv1Homozygous = inv1.has_inversion && inv1.inversion_genotype === "1/1";
        const inv22Homozygous = inv22.has_inversion && inv22.inversion_genotype === "1/1";

        // Check for compound heterozygosity (assume both inversions present in trans)
        const compoundHet = inv1.has_inversion && inv22.has_inversion &&
            (inv1.inversion_genotype === "0/1" || inv1.inversion_genotype === "1/0") &&
            (inv22.inversion_genotype === "0/1" || inv22.inversion_genotype === "1/0");

        const homozygousPmids = [
            "20664893",
            "19302446"
        ];

        const homozygousCitations = [
            `Martin-Salces, Monica, et al. "Clinical and genetic findings in five female patients with haemophilia A: Identification of a novel missense mutation, p. Phe2127Ser." Thrombosis and haemostasis 104.10 (2010): 718-723.`,
            `Pavlova, A., et al. "Molecular mechanisms underlying hemophilia A phenotype in seven females." Journal of Thrombosis and Haemostasis 7.6 (2009): 976-982.`
        ];


        if (inv1Homozygous || inv22Homozygous || compoundHet) {
            interpretation = "Results indicate the presence of ";
            classification = "Pathogenic";
            if (inv1Homozygous) {
                interpretation += "a homozygous F8 Intron 1 inversion. ";
                interpretation += "This finding is consistent with Hemophilia A in females, which is rare but can occur with homozygous pathogenic variants (PMIDs: 20664893, 19302446). Affected individuals typically present with spontaneous soft-tissue, muscular, and joint bleeding.";
                pubMedIDs = homozygousPmids;
                pubMedCitations = homozygousCitations;
            } else if (inv22Homozygous) {
                interpretation += "a homozygous F8 Intron 22 inversion. ";
                interpretation += "This finding is consistent with Hemophilia A in females, which is rare but can occur with homozygous pathogenic variants (PMIDs: 20664893, 19302446). Affected individuals typically present with spontaneous soft-tissue, muscular, and joint bleeding.";
                pubMedIDs = homozygousPmids;
                pubMedCitations = homozygousCitations;
            } else if (compoundHet) {
                interpretation += "compound heterozygous F8 inversions (both Intron 1 and Intron 22 inversions detected). ";
                interpretation += "This finding is consistent with Hemophilia A in females, which is rare but can occur with compound heterozygous pathogenic variants (PMIDs: 18665854, 16805874). Affected individuals typically present with spontaneous soft-tissue, muscular, and joint bleeding.";
                pubMedIDs = [
                    "18665854",
                    "16805874"
                ];
                pubMedCitations = [
                    `Venceslá, A., et al. "Severe haemophilia A in a female resulting from an inherited gross deletion and a de novo codon deletion in the F8 gene." Haemophilia 14.5 (2008): 1094-1098.`,
                    `Cai, X-H., et al. "Female hemophilia A heterozygous for a de novo frameshift and a novel missense mutation of factor VIII." Journal of Thrombosis and Haemostasis 4.9 (2006): 1969-1974.`
                ];
            }

            interpretation += " Genetic counseling is recommended.";
        } else if (inv1.has_inversion || inv22.has_inversion) {
            // Female carrier status
            interpretation = "Results indicate the presence of a";
            classification = "Intermediate";
            if (inv1.has_inversion) {
                interpretation += `heterozygous F8 Intron 1 inversion. `;
                interpretation += "This finding is consistent with carrier status for severe Hemophilia A. Female carriers are typically asymptomatic, with factor VIII activity levels approximately 50% of normal (PMID: 33082527).";
            } else if (inv22.has_inversion) {
                interpretation += `heterozygous F8 Intron 22 inversion. `;
                interpretation += "This finding is consistent with carrier status for severe Hemophilia A. Female carriers are typically asymptomatic, with factor VIII activity levels approximately 50% of normal. (PMID: 33082527)";
            }

            pubMedIDs = ["33082527"];
            pubMedCitations = [
                `Garagiola, Isabella, et al. "X Chromosome inactivation: a modifier of factor VIII and IX plasma levels and bleeding phenotype in Haemophilia carriers." European Journal of Human Genetics 29.2 (2021): 241-249.`
            ];

            interpretation += " However, some carriers may experience mild bleeding symptoms. Genetic counseling is recommended for reproductive planning.";
        } else {
            // No inversions detected
            interpretation = "No F8 inversions detected. This does not rule out carrier status for Hemophilia A, as other variants in F8 beyond these common inversions can also cause this condition. Further genetic testing may be warranted if clinically indicated.";
        }
    }

    if (inv1.has_inversion) {
        svType = "Intron 1 Inversion";
        detailsHtml += `<b>Intron 1 Inversion Genotype:</b> ${inv1.inversion_genotype}</br>`;
    }
    if (inv22.has_inversion) {
        svType = "Intron 22 Inversion";
        detailsHtml += `<b>Intron 22 Inversion Genotype:</b> ${inv22.inversion_genotype}</br>`;
    }
    if (inv1.has_inversion && inv22.has_inversion) {
        svType = "Introns 1 / 22 Inversion";
    }

    return {
        svType: svType,
        primaryGene: "F8",
        genes: "F8",
        interpretation,
        classification,
        detailsHtml,
        pubMedIDs: pubMedIDs,
        pubMedCitations,
    };
}

function loadPacBioStructuralVariants(pacBioJsonFile, sex) {
    // Load paraphrase data
    let pacBioRawData = "";
    try {
        pacBioRawData = fs.readFileSync(pacBioJsonFile, 'utf8');
    } catch {
        return [];
    }
    
    const pacBioJson = JSON.parse(pacBioRawData);
    const results = pacBioJson.locus_results;
    const structuralVariants = [];
    if (results.smn1 && results.smn1.paraphase_results && results.smn1.paraphase_results.smn1) {
        let smn1Info = results.smn1.paraphase_results.smn1;
        if (results.smn1.paraphase_results.smn1.smn_info != null) {
            smn1Info = results.smn1.paraphase_results.smn1.smn_info;
        }
        
        if (smn1Info.smn1_cn != null) {
            structuralVariants.push(interpretParaphraseSMN1(smn1Info));
        }
    }
    if (results.hba && results.hba.paraphase_results && results.hba.paraphase_results.hba.total_cn != null) {
        structuralVariants.push(interpretParaphraseHBA(results.hba.paraphase_results.hba));
    }
    if (results.cyp21 && results.cyp21.paraphase_results && results.cyp21.paraphase_results.cyp21.total_cn != null) {
        structuralVariants.push(interpretParaphraseCYP21A2(results.cyp21.paraphase_results.cyp21));
    }

    
    if (results.f8inv1 && results.f8inv1.paraphase_results && results.f8inv22 && results.f8inv22.paraphase_results) {
        const f8inv1 = results.f8inv1.paraphase_results.f8inv1;
        const f8inv22 = results.f8inv22.paraphase_results.f8inv22;
        structuralVariants.push(interpretPacBioF8(f8inv1, f8inv22, sex));
    }

    return structuralVariants.filter(sv => SvInclusionClassifications.includes(sv.classification));
}

function getVariantInterpretation(variant) {
    const criteriaDescriptions = variant["ACMGClassificationCriteriaDescription"];
    if (criteriaDescriptions == null || criteriaDescriptions.length === 0) {
        return "Not specified";
    }

    return criteriaDescriptions.map(description => {
        const parts = description.split(":");
        if (parts.length < 2) {
            return null;
        }

        const sentence = parts[1].trim();
        if (!sentence.endsWith(".")) {
            return `${sentence}.`;
        }

        return sentence;
    }).filter(d => d != null).join(" ");
}

function formatTitle(str) {
    if (!str) {
        return '';
    }

    const words = str.replace(/_/g, ' ').split(' ');
    const formattedWords = words.map(word => {
        if (word.length === 0) return '';
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });

    return formattedWords.join(' ');
}

function fillVariantDetails(variant) {
    // Name and Interpretation
    variant.name = variant.HGVSpDot ?? variant.HGVScDot;
    variant.interpretation = getVariantInterpretation(variant);
    variant.Zygosity = variant.Zygosity ? variant.Zygosity.replace(" Variant", "") : "Unknown";

    // Set Classification to maximum pathogenicity between ClinVar and Auto-Classifier
    const clinVarScore = getClassificationScore(variant.clinVarClassification);
    const autoScore = getClassificationScore(variant.Classification);
    if (clinVarScore > autoScore) {
        variant.Classification = variant.clinVarClassification;
    }

    // Transcript and Location
    let relevantGene = variant["GeneName"];
    variant.location = formatTitle(variant["GeneRegionCombined"]);
    variant.transcript = "";
    const geneIndex = variant["GeneNames"].indexOf(relevantGene);
    if (geneIndex >= 0) {
        if (variant["TranscriptNameClinicallyRelevant"] && variant["TranscriptNameClinicallyRelevant"].length > geneIndex) {
            variant.transcript = variant["TranscriptNameClinicallyRelevant"][geneIndex];
        }

        if (variant.location === "Exon" && variant["ExonNumberClinicallyRelevant"] && variant["ExonNumberClinicallyRelevant"].length > geneIndex) {
            const exonNumber = variant["ExonNumberClinicallyRelevant"][geneIndex];
            variant.location = `Exon ${exonNumber}`;
        }
    }

    // Max frequency population name
    variant.maxPopName = variant.MaxSubPopulationFreqGroupName ?? "";
    if (variant.maxPopName.startsWith("Annotated ")) {
        variant.maxPopName = variant.maxPopName.split("Annotated")[1].trim();
        variant.maxPopName = variant.maxPopName.replace("  ", " ");
    }

    // NGS Reads Supporting Change
    variant.altReadCount = 0;
    variant.vaf = 0;
    if (variant.VAF && variant.VAF[0]) {
        variant.vaf = variant.VAF[0];
    }
    if (variant.AD && variant.GT && variant.GT.length > 0) {
        let gtValues = [variant.GT.slice(-1)];
        if (variant.GT.includes("|")) {
            gtValues = variant.GT.split("|");
        }
        if (variant.GT.includes("/")) {
            gtValues = variant.GT.split("/");
        }

        for (const gtValue of gtValues) {
            const alleleIdx = parseInt(gtValue);
            if (alleleIdx > 0 && alleleIdx < variant.AD.length) {
                variant.altReadCount = variant.AD[alleleIdx];
                break;
            }
        }
    }

    return variant
}

function getReportedRegionDetails(smallVariants, structuralVariants, strGenotypes) {
    return GeneData.map(gene => {
        const geneVariants = smallVariants.filter(v => v.GeneName === gene.gene);
        const geneStrs = strGenotypes.filter(g => g.gene === gene.gene);
        const geneSvs = structuralVariants.filter(g => g.primaryGene === gene.gene);

        if (geneVariants.length === 0 && geneStrs.length === 0 && geneSvs.length === 0) {
            return null;
        }

        const disorderDescription = disorderDescriptions[gene.disorder];

        return {
            name: gene.gene,
            disorder: gene.disorder,
            disorderDescription: disorderDescription ?? "",
            variants: geneVariants,
            structuralVariants: geneSvs,
            strGenotypes: geneStrs,
        }
    }).filter(g => g != null);
}

export function normalizeInputDate(value) {
    try {
        const dateValue = parseDateString(value);
        return dateValue ? formattedDateUS(dateValue) : "";
    } catch {
        return "";
    }
}

export function parseDateString(value) {
    if (!value) {
        return null;
    }
    if (value.includes('-') && !value.includes('T')) {
        value = value.replace(/-/g, '\/');
    }
    try {
        return new Date(value);
    } catch {
        return null;
    }
}

export function formattedDateUS(date) {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}

function loadSampleState(tableRecord) {
    const today = new Date();
    const out = {
        sampleName: "",
        patientName: "",
        sex: "Unknown",
        specimenSite: "",
        reportDate: formattedDateUS(today),
        dateOrdered: "",
        dateCollected: "",
        dateReceived: "",
        accession: "",
        sampleNote: "",
        mrn: "",
        dob: "",
        orderingPhysician: "",
        facility: "",
        contactPerson: "",
        country: "",
        postalCode: "",
        drugs: [],
    };

    for (const field in tableRecord) {
        const value = tableRecord[field];
        if (value == null || field == null) {
            continue;
        }

        const fieldName = field.toLowerCase();
        if (fieldName === "samples") {
            out.sampleName = value;
        }
        if (fieldName === "sex" || fieldName === "gender") {
            if(value.startsWith("M")) {
                out.sex = "Male";
            }
            if(value.startsWith("F")) {
                out.sex = "Female";
            }
        }
        if (fieldName.includes('patientname')) {
            out.patientName = value;
        }
        if (fieldName.includes('site')) {
            out.specimenSite = value;
        }
        if (fieldName.includes('ordered')) {
            out.dateOrdered = normalizeInputDate(value);
        }
        if (fieldName.includes("collected") || fieldName.includes("dateofcollection") || fieldName.includes("collectiondate")) {
            out.dateCollected = normalizeInputDate(value);
        }
        if (fieldName.includes('received')) {
            out.dateReceived = normalizeInputDate(value);
        }
        if (fieldName.includes('accession')) {
            out.accession = value;
        }
        if (fieldName.includes('note')) {
            out.sampleNote = value;
        }
        if (fieldName.includes('mrn')) {
            out.mrn = value;
        }
        if (
            fieldName.includes('dob') ||
            fieldName.includes('birth') ||
            fieldName.includes('born') ||
            fieldName.includes('d.o.b')
        ) {
            out.dob = normalizeInputDate(value);
        }
        if (fieldName.includes('physician')) {
            out.orderingPhysician = value;
        }
        if (fieldName.includes('facility')) {
            out.facility = value;
        }
        if (fieldName.includes('contact') || fieldName.includes('recipient')) {
            out.contactPerson = value;
        }
        if (fieldName.includes("country")) {
            out.country = value;
        }
        if (fieldName.includes("postal") || fieldName.startsWith("zip")) {
            out.postalCode = value;
        }
        if (fieldName.includes('additional')) {
            out.patientAdditional = value;
        }
        if ((fieldName.includes('drugs') || fieldName.includes('medications'))) {
            if (Array.isArray(value)) {
                out.drugs = value;
            } else if (typeof value === 'string') {
                out.drugs = value.split(",").map(v => v.trim());
            }
        }
    }
    return out;
}

async function loadTableRecords(sourceTable, tableApi, sampleId, recordIds) {
    if (recordIds == null) {
        recordIds = [];
        for (let i = 0; i < sourceTable.recordCount; i++) {
            recordIds.push(i);
        }
    }
    const fieldSymbols = sourceTable.fields.map(f => f.symbol);
    let tableRecords = [];
    for (const recordId of recordIds) {
        const records = (await tableApi.projectTableRecords({
            sourceUrl: sourceTable.url,
            recordId,
            sampleId: parseInt(sampleId),
            fieldSymbols: fieldSymbols,
        })).filter(r => r.length === fieldSymbols.length).map(r => {
            let record = {
                recordId,
            };
            for (let f = 0; f < fieldSymbols.length; f++) {
                record[fieldSymbols[f]] = r[f];
            }
            return record;
        });
        tableRecords = tableRecords.concat(records);
    }
    return tableRecords;
}

async function loadSmallVariants(sourceTable, tableApi, sampleId, recordIds) {
    const records = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    return records.map(record => {
        if (record["GT"] == null || record["GT"] === "." || record["GT"] === "./." || record["GT"] === "0/0") {
            return null;
        }

        return record;
    }).filter(r => r != null);
}

async function loadPacBioStrVariants(sourceTable, tableApi, sampleId, recordIds) {
    const records = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    const motifFields = ["TRID", "MOTIFS", "MC", "SD"];
    return records.map(record => {
        for (const field of motifFields) {
            if (record[field] == null || record[field].length < 1) {
                return null;
            }
        }

        return record;
    }).filter(r => r != null);
}

async function loadExpansionHunterStrVariants(sourceTable, tableApi, sampleId, recordIds) {
    const records = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    const motifFields = ["RU", "ADSP", "REPCI", "REPCN"];
    return records.map(record => {
        if (record["GT"] == null || record["GT"] === "." || record["GT"] === "./." || record["GT"] === "0/0") {
            return null;
        }

        for (const field of motifFields) {
            if (record[field] == null || record[field].length < 1) {
                return null;
            }
        }

        return record;
    }).filter(r => r != null);
}

async function annotateVariants(variants, sourceTable, tableApi, sampleId, recordIds) {
    const records = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    return variants.map(variant => {
        const annotationRecord = records.find(r => r.recordId === variant.recordId);
        if (annotationRecord) {
            return { ...variant, ...annotationRecord };
        }
        return variant;
    });
}

async function annotateClinVarClassification(variants, sourceTable, tableApi, sampleId, recordIds) {
    const records = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    return variants.map(variant => {
        variant.clinVarClassification = "";
        const clinVarRecord = records.find(r => r.recordId === variant.recordId);
        if (clinVarRecord) {
            const currentScore = getClassificationScore(clinVarRecord.Classification);
            const previousScore = getClassificationScore(variant.clinVarClassification)
            if (currentScore >= previousScore) {
                variant.clinVarClassification = clinVarRecord.Classification;
            }
        }
        return variant;
    });
}

async function annotateAcmg(variants, sourceTable, tableApi, sampleId, recordIds) {
    const acmgRecords = await loadTableRecords(sourceTable, tableApi, sampleId, recordIds);
    return variants.map(variant => {
        const acmgRecord = acmgRecords.find(r => r.recordId === variant.recordId);
        if (acmgRecord) {
            const currentScore = getClassificationScore(acmgRecord.Classification);
            const previousScore = getClassificationScore(variant.Classification)
            if (currentScore >= previousScore) {
                return { ...variant, ...acmgRecord };
            }
        }
        return variant;
    });
}

function classifyMotifCount(count, strVariant) {
    const benignMin = strVariant["BenignMin"];
    const benignMax = strVariant["BenignMax"];
    const pathogenicMin = strVariant["PathogenicMin"];
    const pathogenicMax = strVariant["PathogenicMax"];
    const intermediateMin = strVariant["IntermediateMin"];
    const intermediateMax = strVariant["IntermediateMax"];

    if (pathogenicMin != null && count >= pathogenicMin) {
        if (pathogenicMax != null && count <= pathogenicMax) {
            return "Pathogenic";
        }
    }
    if (intermediateMin != null && count >= intermediateMin) {
        if (intermediateMax != null && count <= intermediateMax) {
            return "Intermediate";
        }
    }
    if (benignMin != null && count >= benignMin) {
        if (benignMax != null && count <= benignMax) {
            return "Benign";
        }
    }
    return "Unknown";
}

function classifyStrGenotype(haplotypes, inheritance, xChromosomeCount) {
    const evaluateDominant = (haplotypes) => {
        if (haplotypes.some(h => h.classification === "Pathogenic")) {
            return "Pathogenic";
        }
        if (haplotypes.some(h => h.classification === "Intermediate")) {
            return "Intermediate";
        }
        return "Benign";
    };

    const evaluateRecessive = (haplotypes) => {
        if (haplotypes.every(h => h.classification === "Pathogenic")) {
            return "Pathogenic";
        }
        if (haplotypes.some(h => h.classification === "Pathogenic")) {
            return "Intermediate";
        }
        return "Benign";
    };

    if (inheritance === "Autosomal Dominant" || inheritance === "X-Linked Dominant") {
        return evaluateDominant(haplotypes);
    }

    if (inheritance === "Autosomal Recessive") {
        return evaluateRecessive(haplotypes);
    }

    if (inheritance === "X-Linked Recessive") {
        if (xChromosomeCount === 1) {
            return evaluateDominant(haplotypes);
        }
        return evaluateRecessive(haplotypes);
    }

    return "Unknown";
}

function getRepeatMotifs(strVariant) {
    if (strVariant["MOTIFS"]) {
        return strVariant["MOTIFS"];
    }
    if (strVariant["RU"]) {
        if (typeof strVariant["RU"] === 'string') {
            return [strVariant["RU"]];
        }
        return strVariant["RU"];
    }
    return [];
}

function getMotifCounts(strVariant) {
    if (strVariant["MC"]) {
        return strVariant["MC"];
    }
    if (strVariant["REPCN"]) {
        return strVariant["REPCN"].split("/");
    }
}

function getRepeatConfidenceIntervals(strVariant) {
    if (strVariant["REPCI"]) {
        return strVariant["REPCI"].split("/");
    }
    return [];
}

function getRepeatDepths(strVariant) {
    if (strVariant["SD"]) {
        return strVariant["SD"];
    }
    if (strVariant["ADSP"]) {
        return strVariant["ADSP"].split("/").map(dp => parseInt(dp));
    }
}

function getTandemRepeatId(strVariant) {
    if (strVariant["TRID"]) {
        return Array.isArray(strVariant["TRID"]) ? strVariant["TRID"][0] : strVariant["TRID"];
    }
    if (strVariant["GeneName"]) {
        return strVariant["GeneName"];
    }
}

function getStrGenotypeDetails(strVariant) {
    if (strVariant["PathogenicMotif"] == null) {
        return null;
    }

    const pathogenicMotifs = strVariant["PathogenicMotif"];
    const variantMotifs = getRepeatMotifs(strVariant);
    const trid = getTandemRepeatId(strVariant);
    const genomicPosition = `${strVariant["SEGMENT_CHR"]}:${strVariant["SEGMENT_START"]}`;
    let inheritance = "Autosomal Recessive";
    if (strVariant["ModeofInheritance"] && strVariant["ModeofInheritance"].length > 0) {
        // TODO: not sure how to resolve multiple inheritance modes
        inheritance = strVariant["ModeofInheritance"][0];
    }

    const candidateGenotypes = [];
    for (const pathogenicMotif of pathogenicMotifs) {
        const motifIdx = variantMotifs.indexOf(pathogenicMotif);
        if (motifIdx < 0) {
            continue;
        }

        const genotype = {
            gene: strVariant["GeneName"],
            trid: trid,
            region: strVariant["Region"],
            genomicPosition: genomicPosition,
            motif: pathogenicMotif,
            haplotypes: [],
        }

        const motifCountsPerGenotype = getMotifCounts(strVariant);
        const confidenceIntervals = getRepeatConfidenceIntervals(strVariant);
        for (let i=0; i < motifCountsPerGenotype.length; i++) {
            const motifCounts = motifCountsPerGenotype[i];
            const motifCountList = motifCounts.split("_");
            const readDepthList = getRepeatDepths(strVariant);
            if (motifCountList.length != variantMotifs.length || readDepthList.length != motifCountsPerGenotype.length) {
                continue;
            }

            let confidenceInterval = null;
            if (confidenceIntervals.length === motifCountsPerGenotype.length) {
                confidenceInterval = confidenceIntervals[i];
            }

            const motifCount = parseInt(motifCountList[motifIdx]);
            const classification = classifyMotifCount(motifCount, strVariant);
            genotype.haplotypes.push({
                motifCount,
                confidenceInterval,
                classification,
                readDepth: readDepthList[i],
            });
        }

        genotype.classification = classifyStrGenotype(genotype.haplotypes, inheritance, strVariant.xChromosomeCount);
        candidateGenotypes.push(genotype);
    }

    const pathogenicGenotype = candidateGenotypes.find(g => g.classification === "Pathogenic");
    if (pathogenicGenotype) {
        return pathogenicGenotype;
    }

    const intermediateGenotype = candidateGenotypes.find(g => g.classification === "Intermediate");
    if (intermediateGenotype) {
        return intermediateGenotype;
    }

    if (candidateGenotypes.length > 0) {
        return candidateGenotypes[0];
    }

    return null;
}

function getClassificationColor(classification) {
    if (classification === "Intermediate") {
        return "#FFC35C";
    }
    if (classification === "Pathogenic" || classification === "Likely Pathogenic") {
        return "#DD537A";
    }
    if (classification === "Benign" || classification === "Likely Benign") {
        return "#8DCC56";
    }
    return "#A1A1A1";
}

function getClassificationScore(classification) {
    if (classification === "Pathogenic") {
        return 4;
    }
    if (classification === "Likely Pathogenic") {
        return 3;
    }
    if (classification === "Intermediate") {
        return 2;
    }
    if (classification === "Likely Benign") {
        return 1;
    }
    if (classification === "Benign") {
        return 0;
    }
    return -1;
}

function getClassificationSymbol(classification) {
    if(classification === "Intermediate") {
        return "⚠";
    }
    if(classification === "Pathogenic") {
        return "⊘";
    }
    if(classification === "Benign") {
        return "✓";
    }
    return "?";
}

function formatStrMotifCount(haplotypes) {
    const color = getClassificationColor(haplotypes.classification);
    return `<span style="color:${color};">${haplotypes.motifCount}</span>`;
}

function formatStrMotifGenotype(haplotypes) {
    let motifHtml = formatStrMotifCount(haplotypes);
    if (haplotypes.confidenceInterval) {
        motifHtml = `${motifHtml}</br><span style="color:#A1A1A1;">${haplotypes.confidenceInterval}</span>`;
    }
    return motifHtml;
}

function formatDisease(disease, classification) {
    const symbol = getClassificationSymbol(classification);
    const color = getClassificationColor(classification);
    return `<span style="color:${color};">${symbol} </span><span>${disease}</span>`
}

function formatClassification(classification) {
    const color = getClassificationColor(classification);
    return `<span style="color:${color};">${classification}</span>`
}

function loadMotifPlot(svgFile, gene) {
    let svgData = null;
    try {
        svgData = fs.readFileSync(svgFile, 'utf8');
    } catch {
        return null;
    }

    // Parse out the width and height from SVG line like this:
    // <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="773.9999999999999" height="9411">
    const svgMatch = svgData.match(/<svg[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"[^>]*>/);
    const width = svgMatch ? parseInt(svgMatch[1], 10) : 0;
    const height = svgMatch ? parseInt(svgMatch[2], 10) : 0;
    // Set size to width 500 and height proportional to width based on detected size (if present)
    let size = [500, 500]; // width, hight
    if (width && height) {
        // Plots are tall, so we scale the height by 0.25
        size = [500, (500 * height / width) * 0.25];
        // Max hieght 700
        if (size[1] > 700) {
            size = [500, 700];
        }
    }

    return {
        img: svgFile,
        data: svgData,
        props: {
            alt: `Allele Motif Plot for ${gene}`,
        },
        size
    };
}

function addMustCallStrGenotypes(strGenotypes) {
    MustCallTandemRepeatIDs.forEach(mustCallTrid => {
        const hasTrid = strGenotypes.some(g => g.trid === mustCallTrid || g.gene == mustCallTrid);
        if (!hasTrid) {
            const gene = mustCallTrid.split("_").pop();
            const geneData = GeneData.find(g => g["gene"] === gene);
            const disease = geneData ? geneData["disorder"] : "Unknown";
            strGenotypes.push({
                gene: gene,
                trid: mustCallTrid,
                region: "Unknown",
                motif: "Unknown",
                readDepth: "Unknown",
                motifGenotype1: "?",
                motifGenotype2: "?",
                disease: disease,
                diseaseHtml: disease,
                inheritance: "Unknown",
                classificationHtml: "Unknown",
                classification: "Unknown",
                pubMedIDs: [],
                motifPlot: null
            });
        }
    });

    return strGenotypes;
}

function getStrGenotypes(strVariants) {
    let strGenotypes = [];
    for (const variant of strVariants) {
        const genotypeDetails = getStrGenotypeDetails(variant);
        if (genotypeDetails == null) {
            continue;
        }

        // Skip if we already analyzed this genotype (possible due to allelic splitting)
        const existingGenotype = strGenotypes.find(g => g.trid === genotypeDetails.trid && g.motif === genotypeDetails.motif);
        if (existingGenotype) {
            continue;
        }

        // Format the output and add to strGenotypes
        const readDepth = genotypeDetails.haplotypes.map(h => `${h.readDepth}`).join(" / ");
        let motifCount1 = "";
        let motifGenotype1 = "";
        if (genotypeDetails.haplotypes.length > 0) {
            motifCount1 = formatStrMotifCount(genotypeDetails.haplotypes[0]);
            motifGenotype1 = formatStrMotifGenotype(genotypeDetails.haplotypes[0]);
        }
        let motifCount2 = "";
        let motifGenotype2 = "";
        if (genotypeDetails.haplotypes.length > 1) {
            motifCount2 = formatStrMotifCount(genotypeDetails.haplotypes[1]);
            motifGenotype2 = formatStrMotifGenotype(genotypeDetails.haplotypes[1]);
        }

        let relevantGene = variant["GeneName"];
        let location = variant["Region"];
        let transcript = "";
        const geneIndex = variant["GeneNames"].indexOf(relevantGene);
        if (geneIndex >= 0) {
            if (variant["TranscriptNameClinicallyRelevant"] && variant["TranscriptNameClinicallyRelevant"].length > geneIndex) {
                transcript = variant["TranscriptNameClinicallyRelevant"][geneIndex];
            }

            if (location === "Coding" && variant["ExonNumberClinicallyRelevant"] && variant["ExonNumberClinicallyRelevant"].length > geneIndex) {
                const exonNumber = variant["ExonNumberClinicallyRelevant"][geneIndex];
                location = `Exon ${exonNumber}`;
            }
        }

        const countThresholds = {
            benignMax: variant["BenignMax"],
            benignMin: variant["BenignMin"],
            intermediateMax: variant["IntermediateMax"],
            intermediateMin: variant["IntermediateMin"],
            pathogenicMax: variant["PathogenicMax"],
            pathogenicMin: variant["PathogenicMin"],
        };

        strGenotypes.push({
            gene: relevantGene,
            genomicPosition: genotypeDetails.genomicPosition,
            trid: genotypeDetails.trid,
            transcript: transcript,
            region: variant["Region"],
            chr: genotypeDetails.chr,
            start: genotypeDetails.start,
            location: location,
            motif: genotypeDetails.motif,
            readDepth: readDepth,
            motifCount1: motifCount1,
            motifGenotype1: motifGenotype1,
            motifCount2: motifCount2,
            motifGenotype2: motifGenotype2,
            disease: variant["Disease"],
            diseaseHtml: formatDisease(variant["Disease"], genotypeDetails.classification),
            inheritance: variant["ModeofInheritance"],
            classificationHtml: formatClassification(genotypeDetails.classification),
            classification: genotypeDetails.classification,
            details: variant["Details"],
            prevalence: variant["Prevalence"],
            ageAtOnset: variant["AgeatOnset"],
            pubMedIDs: variant["PubMedIDs"] ?? [],
            pubMedCitations: variant["PubMedCitations"] ?? [],
            countThresholds: countThresholds,
            motifPlot: null
        });

    }

    strGenotypes = addMustCallStrGenotypes(strGenotypes);

    strGenotypes.sort((a, b) => {
        // Compare classifications in reverse order so order is Pathogenic, Intermediate, Benign
        return b.classification.localeCompare(a.classification);
    });

    return strGenotypes;
}

function getIncidentalStrMotifs(strVariants, primaryStrGenotypes) {
    const secondaryFindings = [];
    for (const variant of strVariants) {
        const variantMotifs = getRepeatMotifs(variant);

        for (let motifIdx = 0; motifIdx < variantMotifs.length; motifIdx++) {
            const motif = variantMotifs[motifIdx];

            const haplotypes = [];
            const motifCountsPerGenotype = getMotifCounts(variant);
            for (let i = 0; i < motifCountsPerGenotype.length; i++) {
                const motifCounts = motifCountsPerGenotype[i];
                const motifCountList = motifCounts.split("_");
                const readDepthList = getRepeatDepths(variant);
                if (motifCountList.length != variantMotifs.length || readDepthList.length != motifCountsPerGenotype.length) {
                    continue;
                }

                const motifCount = parseInt(motifCountList[motifIdx]);
                if (motifCount > 0) {
                    haplotypes.push({
                        motifCount,
                        readDepth: readDepthList[i],
                    });
                }
            }

            let relevantGene = variant["GeneName"];
            if (relevantGene == null && variant["GeneNames"] && variant["GeneNames"].length > 0) {
                relevantGene = variant["GeneNames"][0];
            }

            const isPrimaryFinding = primaryStrGenotypes.find(g => g.gene === relevantGene && g.motif === motif);
            if(isPrimaryFinding || haplotypes.length === 0) {
                continue;
            }

            let region = variant["Region"];
            if (region == null && variant["GeneRegionCombined"].length > 0) {
                region = variant["GeneRegionCombined"][0];
                region = region.charAt(0).toUpperCase() + region.slice(1);
            }

            const readDepth = haplotypes.map(h => `${h.readDepth}`).join(" / ");

            let motifCount1 = "";
            if (haplotypes.length > 0) {
                motifCount1 = formatStrMotifCount(haplotypes[0]);
            }
            let motifCount2 = "";
            if (haplotypes.length > 1) {
                motifCount2 = formatStrMotifCount(haplotypes[1]);
            }

            const alreadyExists = secondaryFindings.some(v => v.gene === relevantGene && v.region === variant["Region"] && v.motif === motif);
            if (!alreadyExists) {
                secondaryFindings.push({
                    gene: relevantGene,
                    region: variant["Region"],
                    motif: motif,
                    readDepth: readDepth,
                    motifCount1: motifCount1,
                    motifCount2: motifCount2,
                    disease: variant["Disease"],
                });
            }
        }
    }

    return secondaryFindings;
}

function getRepeatThresholds(strGenotypes) {
    const thresholds = [];
    for (const genotype of strGenotypes) {
        const genotypeThresholds = genotype.countThresholds;
        if (genotypeThresholds == null) {
            continue;
        }

        let benignRange = "N/A";
        if (genotypeThresholds.benignMin != null && genotypeThresholds.benignMax != null) {
            benignRange = `${genotypeThresholds.benignMin} - ${genotypeThresholds.benignMax}`;
        }

        let intermediateRange = "N/A";
        if (genotypeThresholds.intermediateMin != null && genotypeThresholds.intermediateMax != null) {
            intermediateRange = `${genotypeThresholds.intermediateMin} - ${genotypeThresholds.intermediateMax}`;
        }

        let pathogenicRange = "N/A";
        if (genotypeThresholds.pathogenicMin != null && genotypeThresholds.pathogenicMax != null) {
            pathogenicRange = `${genotypeThresholds.pathogenicMin} - ${genotypeThresholds.pathogenicMax}`;
        }

        let geneThresholds = thresholds.find(t => t.gene === genotype.gene && t.disease === genotype.disease);
        if (geneThresholds == null) {
            geneThresholds = {
                gene: genotype.gene,
                disease: genotype.disease,
                motif: genotype.motif,
                benignRange,
                intermediateRange,
                pathogenicRange,
            };
            thresholds.push(geneThresholds);
        }
    }

    thresholds.sort((a, b) => {
        return a.gene.localeCompare(b.gene);
    });

    return thresholds;
}

function getCitations(strGenotypes, structuralVariants) {
    const citations = [];
    for (const strGenotype of strGenotypes) {
        for (let i = 0; i < strGenotype.pubMedIDs.length; i++) {
            const pmid = strGenotype.pubMedIDs[i];
            const citation = strGenotype.pubMedCitations[i];
            const alreadyAdded = citations.some(c => c.id === pmid);
            if (!alreadyAdded) {
                citations.push({
                    id: pmid,
                    citation
                });
            }
        }
    }

    for (const sv of structuralVariants) {
        for (let i = 0; i < sv.pubMedIDs.length; i++) {
            const pmid = sv.pubMedIDs[i];
            const citation = sv.pubMedCitations[i];
            const alreadyAdded = citations.some(c => c.id === pmid);
            if (!alreadyAdded) {
                citations.push({
                    id: pmid,
                    citation
                });
            }
        }
    }

    citations.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
    });

    return citations.map(citation => {
        citation.id = `<a href="https://pubmed.ncbi.nlm.nih.gov/${citation.id}/">${citation.id}</a>`;
        return citation;
    });
}
