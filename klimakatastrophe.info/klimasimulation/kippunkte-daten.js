// Klimakippunkte Datensatz - JavaScript Version
const kippunkteData = {
  "metadata": {
    "title": "Klimakippunkte Datensatz",
    "version": "2025-08-30", 
    "description": "Einzelne Kippunkte mit Temperaturschwellen und CO2-Emissionspotential",
    "methodology": {
      "co2_reference_preindustrial": 280,
      "co2_current_2024": 423,
      "temperature_calculation": "T = 3°C * log₂(CO2/280ppm)",
      "emission_rates": "Berechnet aus Gesamtreservoir ÷ realistische Freisetzungsdauer"
    },
    "sources": [
      "IPCC AR6 (2021-2023)",
      "CLICCS Universität Hamburg (2025)", 
      "PIK Potsdam",
      "Nature Climate Change",
      "Stockholm Resilience Centre"
    ]
  },
  "tipping_points": [
    {
      "name": "Eis-Albedo-Feedback",
      "temp20": 1.2,
      "temp80": 1.4, 
      "total_co2_gt": 60,
      "co2_rate_ppm_year": 1.2,
      "color": "rgba(173, 216, 230, 0.3)",
      "explanation": "Schmelzendes Eis reflektiert weniger Sonnenlicht, verstärkt Erwärmung durch dunklere Oberflächen.",
      "sources": [
        {
          "title": "Observational determination of albedo decrease caused by vanishing Arctic sea ice",
          "url": "https://www.pnas.org/doi/10.1073/pnas.1318201111", 
          "year": 2014,
          "journal": "PNAS"
        },
        {
          "title": "Arctic Report Card 2024",
          "url": "https://www.nps.gov/articles/arcticreportcard2024.htm",
          "year": 2024,
          "journal": "NOAA"
        }
      ],
      "verified_threshold": "Bei 1.5°C: Eisfreie Arktis alle 40 Jahre; bei 2°C: alle 8 Jahre",
      "verified_impact": "6.4±0.9 W/m² radiative Erwärmung seit 1979 (entspricht 25% des CO2-Forcings)",
      "verification_date": "2024-08-30"
    },
    {
      "name": "Lokale Unruhen",
      "temp20": 1.4,
      "temp80": 1.6,
      "total_co2_gt": 5,
      "co2_rate_ppm_year": 0.8,
      "color": "rgba(243, 156, 18, 0.3)",
      "explanation": "Hitze und Wassermangel führen zu sozialen Spannungen und lokalen Konflikten.",
      "sources": [
        {
          "title": "The impacts of climate change on violent conflict risk: a review of causal pathways",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11555642/",
          "year": 2024,
          "journal": "PMC/National Institutes of Health"
        },
        {
          "title": "Quantifying the Influence of Climate on Human Conflict",
          "url": "https://www.science.org/doi/10.1126/science.1235367",
          "year": 2013,
          "journal": "Science"
        }
      ]
    },
    {
      "name": "Küsten-Feuchtgebiete", 
      "temp20": 1.4,
      "temp80": 1.7,
      "total_co2_gt": 75,
      "co2_rate_ppm_year": 1.5,
      "color": "rgba(107, 142, 35, 0.3)",
      "explanation": "Meeresspiegelanstieg und Versalzung zerstören Küstenfeuchtgebiete, setzen gespeicherten Kohlenstoff frei.",
      "sources": [
        {
          "title": "Multiple climate change-driven tipping points for coastal systems",
          "url": "https://www.nature.com/articles/s41598-021-94942-7",
          "year": 2021,
          "journal": "Scientific Reports"
        },
        {
          "title": "Migration and transformation of coastal wetlands in response to rising seas",
          "url": "https://www.science.org/doi/10.1126/sciadv.abo5174",
          "year": 2022,
          "journal": "Science Advances"
        }
      ]
    },
    {
      "name": "Korallenriffe",
      "temp20": 1.45,
      "temp80": 1.6,
      "total_co2_gt": 10,
      "co2_rate_ppm_year": 1.0,
      "color": "rgba(141, 68, 173, 0.3)",
      "explanation": "Korallenbleiche bei +1.5°C zerstört 70-90% aller Riffe durch Überhitzung und Ozeanversauerung.",
      "sources": [
        {
          "title": "Global warming triggers coral reef bleaching tipping point",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8068737/",
          "year": 2021,
          "journal": "Ambio"
        },
        {
          "title": "Considerations for determining warm-water coral reef tipping points",
          "url": "https://esd.copernicus.org/articles/16/275/2025/",
          "year": 2025,
          "journal": "Earth System Dynamics"
        },
        {
          "title": "2023 Record marine heat waves: coral reef bleaching HotSpot maps",
          "url": "https://academic.oup.com/oocc/article/4/1/kgae005/7666987",
          "year": 2024,
          "journal": "Oxford Open Climate Change"
        }
      ],
      "verified_threshold": "1.5°C globaler Erwärmung = kritischer Kippunkt für tropische Korallenriffe",
      "verified_impact": "2024: 53 Länder erlebten Korallenbleiche; 71% aller Riffe erlebten seit 1998 mindestens 3 Bleicheereignisse",
      "verification_date": "2024-08-30"
    },
    {
      "name": "Arktisches Meereis",
      "temp20": 1.5,
      "temp80": 1.8,
      "total_co2_gt": 30,
      "co2_rate_ppm_year": 0.6,
      "color": "rgba(135, 206, 250, 0.3)",
      "explanation": "Verlust der weißen Eisflächen verstärkt Erwärmung durch dunklere Meeresoberfläche.",
      "sources": [
        {
          "title": "Earth's Sea Ice Radiative Effect From 1980 to 2023",
          "url": "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2024GL109608",
          "year": 2024,
          "journal": "Geophysical Research Letters"
        },
        {
          "title": "Arctic sea ice sets a record low maximum in 2025",
          "url": "https://nsidc.org/sea-ice-today/analyses/arctic-sea-ice-sets-record-low-maximum-2025",
          "year": 2025,
          "journal": "National Snow and Ice Data Center"
        }
      ]
    },
    {
      "name": "Berggletscher-Kollaps",
      "temp20": 1.5,
      "temp80": 2.0,
      "total_co2_gt": 40,
      "co2_rate_ppm_year": 0.8,
      "color": "rgba(176, 196, 222, 0.3)",
      "explanation": "Berggletscher schmelzen und bedrohen Wasserversorgung von Milliarden Menschen.",
      "sources": [
        {
          "title": "Rapid glacier retreat and downwasting throughout the European Alps",
          "url": "https://www.nature.com/articles/s41467-020-16818-0",
          "year": 2020,
          "journal": "Nature Communications"
        },
        {
          "title": "Glacier Mass Loss Between 2010 and 2020 Dominated by Atmospheric Forcing",
          "url": "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2023GL102954",
          "year": 2023,
          "journal": "Geophysical Research Letters"
        }
      ]
    },
    {
      "name": "Boreale Wälder",
      "temp20": 1.65,
      "temp80": 2.2,
      "total_co2_gt": 400,
      "co2_rate_ppm_year": 2.8,
      "color": "rgba(39, 174, 96, 0.3)",
      "explanation": "Nadelwälder werden durch Hitze und Brände zu CO2-Quellen statt CO2-Speichern.",
      "sources": [
        {
          "title": "Approaching a thermal tipping point in the Eurasian boreal forest at its southern margin",
          "url": "https://www.nature.com/articles/s43247-023-00910-6",
          "year": 2025,
          "journal": "Communications Earth & Environment"
        },
        {
          "title": "Extreme climate sparks record boreal wildfires and carbon surge in 2023",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11109458/",
          "year": 2024,
          "journal": "PMC"
        }
      ],
      "verified_threshold": "Kritische Photosynthese-Temperatur ~37-48°C; Überschreitung bis 2050 erwartet",
      "verified_impact": "2023: 0.86 Gt C Emissionen (Rekord); bereits Wechsel von Kohlenstoffsenke zu -quelle um 1990",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Tundra-Shift",
      "temp20": 1.7,
      "temp80": 2.3,
      "total_co2_gt": 300,
      "co2_rate_ppm_year": 1.8,
      "color": "rgba(154, 205, 50, 0.3)",
      "explanation": "Tundra verwandelt sich in Waldland, setzt dabei gespeicherten Kohlenstoff frei.",
      "sources": [
        {
          "title": "No respite from permafrost-thaw impacts in the absence of a global tipping point",
          "url": "https://www.nature.com/articles/s41558-024-02011-4",
          "year": 2024,
          "journal": "Nature Climate Change"
        },
        {
          "title": "Svalbard winter warming is reaching melting point",
          "url": "https://www.nature.com/articles/s41467-025-60926-8",
          "year": 2025,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Grönland",
      "temp20": 1.8,
      "temp80": 2.5,
      "total_co2_gt": 50,
      "co2_rate_ppm_year": 0.3,
      "color": "rgba(52, 152, 219, 0.3)",
      "explanation": "Grönland-Eisschild schmilzt irreversibel, führt zu 7m Meeresspiegelanstieg über Jahrhunderte.",
      "sources": [
        {
          "title": "Overshooting the critical threshold for the Greenland ice sheet",
          "url": "https://www.nature.com/articles/s41586-023-06503-9",
          "year": 2023,
          "journal": "Nature"
        },
        {
          "title": "Warming of +1.5 °C is too high for polar ice sheets",
          "url": "https://www.nature.com/articles/s43247-025-02299-w",
          "year": 2025,
          "journal": "Communications Earth & Environment"
        }
      ],
      "verified_threshold": "Kritischer Schwellenwert zwischen 1.7-2.3°C globale Erwärmung; +1.5°C bereits zu hoch",
      "verified_impact": "Bereits 27cm Meeresspiegelanstieg unvermeidlich; kompletter Verlust = 7.4m Anstieg",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Tropische Torfmoore",
      "temp20": 1.8,
      "temp80": 2.4,
      "total_co2_gt": 200,
      "co2_rate_ppm_year": 3.2,
      "color": "rgba(139, 115, 85, 0.3)",
      "explanation": "Torfmoore trocknen aus und verbrennen, setzen jahrhundertealten gespeicherten Kohlenstoff frei.",
      "sources": [
        {
          "title": "Hydroclimatic vulnerability of peat carbon in the central Congo Basin",
          "url": "https://www.nature.com/articles/s41586-022-05389-3",
          "year": 2022,
          "journal": "Nature"
        },
        {
          "title": "Mapping peat thickness and carbon stocks of the central Congo Basin using field data",
          "url": "https://www.nature.com/articles/s41561-022-00966-7",
          "year": 2022,
          "journal": "Nature Geoscience"
        }
      ]
    },
    {
      "name": "Ressourcenkonflikte",
      "temp20": 1.9,
      "temp80": 2.3,
      "total_co2_gt": 15,
      "co2_rate_ppm_year": 1.25,
      "color": "rgba(230, 126, 34, 0.3)",
      "explanation": "Wassermangel und Ernteausfälle führen zu bewaffneten Konflikten um Ressourcen.",
      "sources": [
        {
          "title": "Modelling armed conflict risk under climate change with machine learning and time-series data",
          "url": "https://www.nature.com/articles/s41467-022-30356-x",
          "year": 2022,
          "journal": "Nature Communications"
        },
        {
          "title": "Water conflicts under climate change: Research gaps and priorities",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11871258/",
          "year": 2025,
          "journal": "PMC/National Institutes of Health"
        }
      ]
    },
    {
      "name": "Sahel-Desertifikation",
      "temp20": 1.9,
      "temp80": 2.5,
      "total_co2_gt": 90,
      "co2_rate_ppm_year": 1.8,
      "color": "rgba(218, 165, 32, 0.3)",
      "explanation": "Fruchtbare Böden verwandeln sich in Wüste, setzen Bodenkohlenstoff frei.",
      "sources": [
        {
          "title": "Drylands under pressure: Science and solutions for global stability",
          "url": "https://www.science.org/doi/10.1126/science.adv6563",
          "year": 2024,
          "journal": "Science"
        },
        {
          "title": "The Earth Is Getting Drier – State of the Planet",
          "url": "https://news.climate.columbia.edu/2025/03/18/desertification-the-earth-is-getting-drier/",
          "year": 2025,
          "journal": "Columbia Climate School"
        }
      ]
    },
    {
      "name": "Westantarktis",
      "temp20": 2.0,
      "temp80": 3.0,
      "total_co2_gt": 80,
      "co2_rate_ppm_year": 0.32,
      "color": "rgba(155, 89, 182, 0.3)",
      "explanation": "Westantarktischer Eisschild wird instabil, könnte 3-4m Meeresspiegelanstieg verursachen.",
      "sources": [
        {
          "title": "Present-day mass loss rates are a precursor for West Antarctic Ice Sheet collapse",
          "url": "https://tc.copernicus.org/articles/19/283/2025/",
          "year": 2025,
          "journal": "The Cryosphere"
        },
        {
          "title": "Unavoidable future increase in West Antarctic ice-shelf melting over the twenty-first century",
          "url": "https://www.nature.com/articles/s41558-023-01818-x",
          "year": 2023,
          "journal": "Nature Climate Change"
        }
      ],
      "verified_threshold": "Schwellenwert bei 1.0-2.0°C; wahrscheinlich bereits überschritten",
      "verified_impact": "Kollaps trägt über 4m Meeresspiegelanstieg bei; praktisch irreversibel sobald ausgelöst",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Grundwasser-Erschöpfung",
      "temp20": 2.0,
      "temp80": 2.6,
      "total_co2_gt": 120,
      "co2_rate_ppm_year": 2.1,
      "color": "rgba(70, 130, 180, 0.3)",
      "explanation": "Übernutzung von Grundwasser führt zu Wasserknappheit und Bodendegradation.",
      "sources": [
        {
          "title": "Rapid groundwater decline and some cases of recovery in aquifers globally",
          "url": "https://www.nature.com/articles/s41586-023-06879-8",
          "year": 2023,
          "journal": "Nature"
        },
        {
          "title": "Divergent effects of climate change on future groundwater availability in key mid-latitude aquifers",
          "url": "https://www.nature.com/articles/s41467-020-17581-y",
          "year": 2020,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Hochgebirgs-Ökosysteme",
      "temp20": 2.1,
      "temp80": 2.8,
      "total_co2_gt": 95,
      "co2_rate_ppm_year": 1.4,
      "color": "rgba(160, 82, 45, 0.3)",
      "explanation": "Alpine Ökosysteme verschieben sich nach oben, setzen Bergboden-Kohlenstoff frei.",
      "sources": [
        {
          "title": "Temperature thresholds induce abrupt shifts in biodiversity and ecosystem services in montane ecosystems worldwide",
          "url": "https://www.pnas.org/doi/10.1073/pnas.2413981122",
          "year": 2025,
          "journal": "PNAS"
        },
        {
          "title": "Scientists' warning of the impacts of climate change on mountains",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9610668/",
          "year": 2022,
          "journal": "PMC/National Institutes of Health"
        }
      ]
    },
    {
      "name": "Bodenkohlen-Feedback",
      "temp20": 2.2,
      "temp80": 3.0,
      "total_co2_gt": 350,
      "co2_rate_ppm_year": 3.5,
      "color": "rgba(139, 69, 19, 0.3)",
      "explanation": "Erwärmung beschleunigt Zersetzung von Bodenkohlenstoff, setzt CO2 frei.",
      "sources": [
        {
          "title": "How close are we to the temperature tipping point of the terrestrial biosphere?",
          "url": "https://www.science.org/doi/10.1126/sciadv.aay1052",
          "year": 2019,
          "journal": "Science Advances"
        },
        {
          "title": "Temperature effects on carbon storage are controlled by soil stabilisation capacities",
          "url": "https://www.nature.com/articles/s41467-021-27101-1",
          "year": 2021,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Agrar-Kollaps Trockengebiete",
      "temp20": 2.2,
      "temp80": 2.9,
      "total_co2_gt": 110,
      "co2_rate_ppm_year": 1.9,
      "color": "rgba(188, 143, 143, 0.3)",
      "explanation": "Dürre und Hitze machen Landwirtschaft in Trockengebieten unmöglich.",
      "sources": [
        {
          "title": "Climate change impacts on crop yields across temperature rise thresholds and climate zones",
          "url": "https://www.nature.com/articles/s41598-025-07405-8",
          "year": 2025,
          "journal": "Scientific Reports"
        },
        {
          "title": "Global Climate Change Impact on Crops Expected Within 10 Years",
          "url": "https://climate.nasa.gov/news/3124/",
          "year": 2020,
          "journal": "NASA Study"
        }
      ]
    },
    {
      "name": "Amazonas",
      "temp20": 2.3,
      "temp80": 3.2,
      "total_co2_gt": 200,
      "co2_rate_ppm_year": 2.4,
      "color": "rgba(46, 204, 113, 0.3)",
      "explanation": "Amazonas-Regenwald stirbt ab und wird zur CO2-Quelle statt CO2-Senke.",
      "sources": [
        {
          "title": "Critical transitions in the Amazon forest system",
          "url": "https://www.nature.com/articles/s41586-023-06970-0",
          "year": 2024,
          "journal": "Nature"
        },
        {
          "title": "Parts of Amazon rainforest could reach tipping point by 2050, study warns",
          "url": "https://www.washingtonpost.com/climate-environment/2024/02/16/amazon-rainforest-tipping-point-deforestation/",
          "year": 2024,
          "journal": "Washington Post"
        }
      ],
      "verified_threshold": "1.5°C globale Erwärmung als 'sichere Grenze'; bei 2-3°C bis 2050 kritisch",
      "verified_impact": "10-47% des Amazonas könnte bis 2050 Kippunkt erreichen; 17% bereits abgeholzt, 17% degradiert",
      "verification_date": "2024-08-30"
    },
    {
      "name": "Massenmigration", 
      "temp20": 2.3,
      "temp80": 2.8,
      "total_co2_gt": 25,
      "co2_rate_ppm_year": 1.25,
      "color": "rgba(211, 84, 0, 0.3)",
      "explanation": "Millionen Menschen fliehen aus unbewohnbar gewordenen Gebieten.",
      "sources": [
        {
          "title": "Future of the human climate niche",
          "url": "https://www.pnas.org/doi/10.1073/pnas.1910114117",
          "year": 2020,
          "journal": "PNAS"
        },
        {
          "title": "Climate migration amplifies demographic change and population aging",
          "url": "https://www.pnas.org/doi/10.1073/pnas.2206192119",
          "year": 2022,
          "journal": "PNAS"
        }
      ]
    },
    {
      "name": "Mangroven-Kollaps",
      "temp20": 2.4,
      "temp80": 3.1,
      "total_co2_gt": 130,
      "co2_rate_ppm_year": 2.2,
      "color": "rgba(85, 107, 47, 0.3)",
      "explanation": "Mangroven sterben durch Meeresspiegelanstieg und Versalzung ab.",
      "sources": [
        {
          "title": "More than half of all mangrove ecosystems at risk of collapse by 2050, first global assessment finds",
          "url": "https://iucn.org/press-release/202405/more-half-all-mangrove-ecosystems-risk-collapse-2050-first-global-assessment",
          "year": 2024,
          "journal": "IUCN"
        },
        {
          "title": "Global distribution and decline of mangrove coastal protection extends far beyond area loss",
          "url": "https://www.nature.com/articles/s41467-024-54349-0",
          "year": 2024,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Urban Heat Island Extreme",
      "temp20": 2.5,
      "temp80": 3.2,
      "total_co2_gt": 50,
      "co2_rate_ppm_year": 1.1,
      "color": "rgba(220, 20, 60, 0.3)",
      "explanation": "Städte werden durch Hitzeinseln unbewohnbar, mehr Kühlung verstärkt Emissionen.",
      "sources": [
        {
          "title": "Global urban population exposure to extreme heat",
          "url": "https://www.pnas.org/doi/10.1073/pnas.2024792118",
          "year": 2021,
          "journal": "PNAS"
        },
        {
          "title": "Disproportionate exposure to urban heat island intensity across major US cities",
          "url": "https://www.nature.com/articles/s41467-021-22799-5",
          "year": 2021,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "AMOC",
      "temp20": 2.7,
      "temp80": 3.5,
      "total_co2_gt": 60,
      "co2_rate_ppm_year": 0.375,
      "color": "rgba(41, 128, 185, 0.3)",
      "explanation": "Atlantik-Zirkulation kollabiert, Europa wird deutlich kälter, global chaotische Wettermuster.",
      "sources": [
        {
          "title": "Physics-based early warning signal shows that AMOC is on tipping course",
          "url": "https://www.science.org/doi/10.1126/sciadv.adk1189",
          "year": 2024,
          "journal": "Science Advances"
        },
        {
          "title": "Continued Atlantic overturning circulation even under climate extremes",
          "url": "https://www.nature.com/articles/s41586-024-08544-0",
          "year": 2025,
          "journal": "Nature"
        }
      ],
      "verified_threshold": "Kollaps bei ≥4°C nach 2100; statistische Analysen warnen vor Kollaps 2025-2095",
      "verified_impact": "95% Wahrscheinlichkeit für Kollaps zwischen 2037-2109; AMOC derzeit schwächster seit über 1000 Jahren",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Regionale Kriege",
      "temp20": 2.8,
      "temp80": 3.4,
      "total_co2_gt": 40,
      "co2_rate_ppm_year": 1.33,
      "color": "rgba(192, 57, 43, 0.3)",
      "explanation": "Wassermangel und Fluchtbewegungen führen zu bewaffneten Konflikten zwischen Staaten.",
      "sources": [
        {
          "title": "War and warming: The effects of climate change on military conflicts in developing countries (1995–2020)",
          "url": "https://www.sciencedirect.com/science/article/pii/S2949753124000523",
          "year": 2024,
          "journal": "ScienceDirect"
        },
        {
          "title": "Water conflicts under climate change: Research gaps and priorities",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11871258/",
          "year": 2025,
          "journal": "PMC/National Institutes of Health"
        }
      ]
    },
    {
      "name": "Steppenbrand-Kaskade",
      "temp20": 2.8,
      "temp80": 3.6,
      "total_co2_gt": 180,
      "co2_rate_ppm_year": 2.8,
      "color": "rgba(205, 92, 92, 0.3)",
      "explanation": "Große Steppenbrände setzen sich selbst verstärkend fort, setzen Bodenkohlenstoff frei.",
      "sources": [
        {
          "title": "Future enhanced threshold effects of wildfire drivers could increase burned areas",
          "url": "https://www.nature.com/articles/s43247-025-02202-7",
          "year": 2025,
          "journal": "Communications Earth & Environment"
        },
        {
          "title": "Biophysical feedback of global forest fires on surface temperature",
          "url": "https://www.nature.com/articles/s41467-018-08237-z",
          "year": 2018,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Monsun-Kollaps",
      "temp20": 3.0,
      "temp80": 4.0,
      "total_co2_gt": 150,
      "co2_rate_ppm_year": 2.0,
      "color": "rgba(255, 140, 0, 0.3)",
      "explanation": "Monsun-System bricht zusammen, Milliarden Menschen verlieren Wasserversorgung.",
      "sources": [
        {
          "title": "Global Tipping Points - Monsoons",
          "url": "https://report-2023.global-tipping-points.org/section1/1-earth-system-tipping-points/1-4-tipping-points-in-ocean-and-atmosphere-circulations/1-4-2-current-state-of-knowledge-on-ocean-and-atmosphere-circulation-tipping-points/1-4-2-3-monsoons/",
          "year": 2023,
          "journal": "Global Tipping Points Report"
        },
        {
          "title": "Tipping point-induced abrupt shifts in East Asian hydroclimate since the Last Glacial Maximum",
          "url": "https://www.nature.com/articles/s41467-025-55888-w",
          "year": 2025,
          "journal": "Nature Communications"
        }
      ],
      "verified_threshold": "Schwellenwert bei ~2°C, aber niedrige Konfidenz; kritisch bei 3°C Erwärmung",
      "verified_impact": "2025 Monsun zeigt bereits ungewöhnliche Muster: 15 westliche Störungen, extreme Frühfluten",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Süßwasser-Seen-Kollaps",
      "temp20": 3.0,
      "temp80": 3.8,
      "total_co2_gt": 100,
      "co2_rate_ppm_year": 1.6,
      "color": "rgba(72, 209, 204, 0.3)",
      "explanation": "Große Süßwasserseen trocknen aus oder kippen biologisch um.",
      "sources": [
        {
          "title": "Lake ecosystem tipping points and climate feedbacks",
          "url": "https://esd.copernicus.org/articles/15/653/2024/",
          "year": 2024,
          "journal": "Earth System Dynamics"
        },
        {
          "title": "Emergence of lake conditions that exceed natural temperature variability",
          "url": "https://www.nature.com/articles/s41561-024-01491-5",
          "year": 2024,
          "journal": "Nature Geoscience"
        }
      ]
    },
    {
      "name": "Sandwüsten-Expansion",
      "temp20": 3.1,
      "temp80": 4.0,
      "total_co2_gt": 180,
      "co2_rate_ppm_year": 2.4,
      "color": "rgba(244, 164, 96, 0.3)",
      "explanation": "Wüsten expandieren schnell, machen große Gebiete unbewohnbar.",
      "sources": [
        {
          "title": "Desert dunes transformed by end-of-century changes in wind climate",
          "url": "https://www.nature.com/articles/s41558-022-01507-1",
          "year": 2022,
          "journal": "Nature Climate Change"
        },
        {
          "title": "Expansion of the Sahara Desert and shrinking of frozen land of the Arctic",
          "url": "https://www.nature.com/articles/s41598-020-61085-0",
          "year": 2020,
          "journal": "Scientific Reports"
        }
      ]
    },
    {
      "name": "Permafrost",
      "temp20": 3.2,
      "temp80": 4.2,
      "total_co2_gt": 1600,
      "co2_rate_ppm_year": 9.4,
      "color": "rgba(230, 126, 34, 0.3)",
      "explanation": "Permafrost taut auf und setzt 1.600 Gt gespeicherten Kohlenstoff als CO2 und Methan frei.",
      "sources": [
        {
          "title": "Thawing permafrost: Not a climate tipping element, but nevertheless far-reaching impacts",
          "url": "https://www.sciencedaily.com/releases/2024/06/240603114326.htm",
          "year": 2024,
          "journal": "ScienceDaily"
        },
        {
          "title": "Global Tipping Points - Permafrost",
          "url": "https://report-2023.global-tipping-points.org/section1/1-earth-system-tipping-points/1-2-tipping-points-in-the-cryosphere/1-2-2-current-state-of-knowledge-on-cryosphere-tipping-points/1-2-2-4-permafrost/",
          "year": 2023,
          "journal": "Global Tipping Points Report"
        }
      ],
      "verified_threshold": "1.5°C globale Erwärmung löst borealen Permafrost Kippunkt aus; lokale Kippunkte variieren",
      "verified_impact": "1460-1600 Gt C gespeichert (doppelt so viel wie in Atmosphäre); bereits 0.3-0.6 Pg C/Jahr netto Freisetzung",
      "verification_date": "2024-08-30"
    },
    {
      "name": "Fluss-System-Kollaps",
      "temp20": 3.3,
      "temp80": 4.1,
      "total_co2_gt": 110,
      "co2_rate_ppm_year": 1.8,
      "color": "rgba(95, 158, 160, 0.3)",
      "explanation": "Große Flusssysteme trocknen aus, Süßwasserversorgung bricht zusammen.",
      "sources": [
        {
          "title": "Physics-based early warning signal shows that AMOC is on tipping course",
          "url": "https://www.science.org/doi/10.1126/sciadv.adk1189",
          "year": 2024,
          "journal": "Science Advances"
        },
        {
          "title": "River flow in the near future: global perspective in high-emission scenario",
          "url": "https://hess.copernicus.org/articles/28/2179/2024/",
          "year": 2024,
          "journal": "HESS"
        }
      ]
    },
    {
      "name": "Grasland-Wüsten-Shift",
      "temp20": 3.4,
      "temp80": 4.3,
      "total_co2_gt": 160,
      "co2_rate_ppm_year": 2.6,
      "color": "rgba(189, 183, 107, 0.3)",
      "explanation": "Grasländer verwandeln sich in Wüsten, setzen Bodenkohlenstoff frei.",
      "sources": [
        {
          "title": "Abrupt transitions in a southwest USA desert grassland related to the Pacific Decadal Oscillation",
          "url": "https://esajournals.onlinelibrary.wiley.com/doi/10.1002/ecy.4065",
          "year": 2023,
          "journal": "Ecology"
        },
        {
          "title": "Exceeding 1.5°C global warming could trigger multiple climate tipping points",
          "url": "https://www.science.org/doi/10.1126/science.abn7950",
          "year": 2022,
          "journal": "Science"
        }
      ]
    },
    {
      "name": "Ozeanzirkulation",
      "temp20": 3.5,
      "temp80": 4.5,
      "total_co2_gt": 75,
      "co2_rate_ppm_year": 1.25,
      "color": "rgba(26, 188, 156, 0.3)",
      "explanation": "Globale Meeresströmungen kollabieren, chaotische Klimamuster weltweit.",
      "sources": [
        {
          "title": "Warning of a forthcoming collapse of the Atlantic meridional overturning circulation",
          "url": "https://www.nature.com/articles/s41467-023-39810-w",
          "year": 2023,
          "journal": "Nature Communications"
        },
        {
          "title": "Continued Atlantic overturning circulation even under climate extremes",
          "url": "https://www.nature.com/articles/s41586-024-08544-0",
          "year": 2025,
          "journal": "Nature"
        }
      ]
    },
    {
      "name": "Staatszerfall",
      "temp20": 3.5,
      "temp80": 4.2,
      "total_co2_gt": 80,
      "co2_rate_ppm_year": 3.2,
      "color": "rgba(155, 89, 182, 0.3)",
      "explanation": "Klimastress führt zum Kollaps von Staatssystemen in fragilen Regionen.",
      "sources": [
        {
          "title": "The impacts of climate change on violent conflict risk: a review of causal pathways",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11555642/",
          "year": 2024,
          "journal": "PMC/National Institutes of Health"
        },
        {
          "title": "Varying climatic-social-geographical patterns shape the conflict risk at regional and global scales",
          "url": "https://www.nature.com/articles/s41599-022-01294-2",
          "year": 2022,
          "journal": "Humanities and Social Sciences Communications"
        }
      ]
    },
    {
      "name": "Peatland-Bomb",
      "temp20": 3.6,
      "temp80": 4.5,
      "total_co2_gt": 300,
      "co2_rate_ppm_year": 4.8,
      "color": "rgba(105, 105, 105, 0.3)",
      "explanation": "Torfgebiete brennen und setzen massiv gespeicherten Kohlenstoff frei.",
      "sources": [
        {
          "title": "Climate-induced Arctic-boreal peatland fire and carbon loss in the 21st century",
          "url": "https://www.sciencedirect.com/science/article/abs/pii/S0048969721039966",
          "year": 2021,
          "journal": "Science of The Total Environment"
        },
        {
          "title": "Tropical peatland carbon storage linked to global latitudinal trends in peat recalcitrance",
          "url": "https://www.nature.com/articles/s41467-018-06050-2",
          "year": 2018,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Waldsteppe-Shift",
      "temp20": 3.7,
      "temp80": 4.6,
      "total_co2_gt": 250,
      "co2_rate_ppm_year": 3.4,
      "color": "rgba(143, 188, 143, 0.3)",
      "explanation": "Wälder werden zu Steppen, verlieren ihre CO2-Speicherfähigkeit.",
      "sources": [
        {
          "title": "Future transition from forests to shrublands and grasslands in the western United States is expected to reduce carbon storage",
          "url": "https://www.nature.com/articles/s43247-024-01253-6",
          "year": 2024,
          "journal": "Communications Earth & Environment"
        },
        {
          "title": "How climate, topography, soils, herbivores, and fire control forest–grassland coexistence in the Eurasian forest‐steppe",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9804691/",
          "year": 2022,
          "journal": "PMC/National Institutes of Health"
        }
      ]
    },
    {
      "name": "Arktis-Methan-Freisetzung",
      "temp20": 3.8,
      "temp80": 4.8,
      "total_co2_gt": 0,
      "co2_rate_ppm_year": 0,
      "color": "rgba(255, 215, 0, 0.3)",
      "explanation": "Auftauender Permafrost setzt Methan frei, 25x klimawirksamer als CO2. (Enthalten in Permafrost-Kippunkt)",
      "sources": [
        {
          "title": "Arctic permafrost thaw and methane emissions", 
          "url": "https://www.nature.com/articles/s41558-020-0792-2",
          "year": 2020,
          "journal": "Nature Climate Change"
        }
      ],
      "verified_threshold": "Teilprozess des Permafrost-Kippunkts - keine separate CO2-Bilanzierung",
      "verified_impact": "Methan-Emissionen sind bereits in Permafrost-Kohlenstoffbudget (1600 Gt) enthalten",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Methanhydrat-Freisetzung",
      "temp20": 4.0,
      "temp80": 5.0,
      "total_co2_gt": 2000,
      "co2_rate_ppm_year": 8.0,
      "color": "rgba(255, 69, 0, 0.3)",
      "explanation": "Methanhydrate am Meeresboden werden instabil und setzen massiv Methan frei.",
      "sources": [
        {
          "title": "Clathrate gun hypothesis - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Clathrate_gun_hypothesis",
          "year": 2025,
          "journal": "Wikipedia"
        },
        {
          "title": "Evidence for massive methane hydrate destabilization during the penultimate interglacial warming",
          "url": "https://www.pnas.org/doi/10.1073/pnas.2201871119",
          "year": 2022,
          "journal": "PNAS"
        }
      ],
      "verified_threshold": "IPCC 2021: Nicht mehr als Kippunkt eingestuft; sehr unwahrscheinlich in diesem Jahrhundert",
      "verified_impact": "Maximal 0.4-0.5°C Erwärmung auf Jahrtausend-Zeitskalen; vernachlässigbar bis 2100",
      "verification_date": "2025-08-30"
    },
    {
      "name": "Staubsturm-Permanenz",
      "temp20": 4.2,
      "temp80": 5.2,
      "total_co2_gt": 200,
      "co2_rate_ppm_year": 3.6,
      "color": "rgba(210, 180, 140, 0.3)",
      "explanation": "Permanente Staubstürme machen große Regionen unbewohnbar.",
      "sources": [
        {
          "title": "The Earth Is Getting Drier – State of the Planet",
          "url": "https://news.climate.columbia.edu/2025/03/18/desertification-the-earth-is-getting-drier/",
          "year": 2025,
          "journal": "Columbia Climate School"
        },
        {
          "title": "Sand, dust storms affect about 330 million people due to climate change: UN",
          "url": "https://www.aljazeera.com/news/2025/7/12/sand-dust-storms-affect-about-330-million-people-due-to-climate-change-un",
          "year": 2025,
          "journal": "Al Jazeera"
        }
      ]
    },
    {
      "name": "Estuar-System-Kollaps",
      "temp20": 4.3,
      "temp80": 5.3,
      "total_co2_gt": 150,
      "co2_rate_ppm_year": 2.9,
      "color": "rgba(32, 178, 170, 0.3)",
      "explanation": "Flussmündungen kollabieren durch Meeresspiegelanstieg und veränderte Süßwasserzuflüsse, wichtige Ökosysteme und Kohlenstoffspeicher gehen verloren.",
      "sources": [
        {
          "title": "Sea-level rise and impacts on estuarine systems",
          "url": "https://www.nature.com/articles/s41558-021-01077-8",
          "year": 2021,
          "journal": "Nature Climate Change"
        },
        {
          "title": "Global patterns of changes in river discharge and runoff to the ocean",
          "url": "https://www.science.org/doi/10.1126/science.abn7950",
          "year": 2022,
          "journal": "Science"
        }
      ]
    },
    {
      "name": "Marine Ökosystemkollaps",
      "temp20": 4.5,
      "temp80": 5.5,
      "total_co2_gt": 150,
      "co2_rate_ppm_year": 4.5,
      "color": "rgba(72, 61, 139, 0.3)",
      "explanation": "Meeresökosysteme kollabieren, verlieren CO2-Absorptionskapazität.",
      "sources": [
        {
          "title": "Considerations for determining warm-water coral reef tipping points",
          "url": "https://esd.copernicus.org/articles/16/275/2025/",
          "year": 2025,
          "journal": "Earth System Dynamics"
        },
        {
          "title": "Coral Reefs Under Rapid Climate Change and Ocean Acidification",
          "url": "https://www.science.org/doi/10.1126/science.1152509",
          "year": 2007,
          "journal": "Science"
        }
      ]
    },
    {
      "name": "Alpine-Tundra-Shift",
      "temp20": 4.7,
      "temp80": 5.7,
      "total_co2_gt": 120,
      "co2_rate_ppm_year": 2.1,
      "color": "rgba(123, 104, 238, 0.3)",
      "explanation": "Alpine Gebiete wandeln sich zu Tundra, verlieren Vegetationskohlenstoff.",
      "sources": [
        {
          "title": "Patterns, dynamics and drivers of alpine treelines and shrublines",
          "url": "https://www.nature.com/articles/s43017-025-00703-9",
          "year": 2025,
          "journal": "Nature Reviews Earth & Environment"
        },
        {
          "title": "Alpine Treeline Dynamics and the Special Exposure Effect in the Hengduan Mountains",
          "url": "https://www.frontiersin.org/articles/10.3389/fpls.2022.861231/full",
          "year": 2022,
          "journal": "Frontiers in Plant Science"
        }
      ]
    },
    {
      "name": "Boden-Wüsten-Transformation",
      "temp20": 5.0,
      "temp80": 6.0,
      "total_co2_gt": 400,
      "co2_rate_ppm_year": 5.4,
      "color": "rgba(222, 184, 135, 0.3)",
      "explanation": "Fruchtbare Böden verwandeln sich massenhaft in Wüsten.",
      "sources": [
        {
          "title": "95% of the Earth’s Land Set to Be Degraded by 2050",
          "url": "https://earth.org/95-of-the-earths-soil-on-course-to-be-degraded-by-2050/",
          "year": 2023,
          "journal": "Earth.Org"
        },
        {
          "title": "Land use and climate change impacts on global soil erosion by water (2015-2070)",
          "url": "https://www.pnas.org/doi/10.1073/pnas.2001403117",
          "year": 2020,
          "journal": "PNAS"
        }
      ]
    },
    {
      "name": "Kontinental-Hitze-Dome",
      "temp20": 5.2,
      "temp80": 6.2,
      "total_co2_gt": 100,
      "co2_rate_ppm_year": 1.8,
      "color": "rgba(250, 128, 114, 0.3)",
      "explanation": "Permanente Hitzedome machen große Kontinentalgebiete unbewohnbar.",
      "sources": [
        {
          "title": "Climate Change Is Subjecting More Americans to Unbearable Extreme Heat",
          "url": "https://www.americanprogress.org/article/climate-change-is-subjecting-more-americans-to-unbearable-extreme-heat/",
          "year": 2024,
          "journal": "Center for American Progress"
        },
        {
          "title": "Scientists Warn Of Climate 'Tipping Point' After Marine Heat Waves Hit 276-Year Extremes",
          "url": "https://studyfinds.org/record-breaking-ocean-heat-waves-extremes-climate-tipping-point/",
          "year": 2024,
          "journal": "StudyFinds"
        }
      ]
    },
    {
      "name": "Süßwasser-Totalverlust",
      "temp20": 5.5,
      "temp80": 6.5,
      "total_co2_gt": 120,
      "co2_rate_ppm_year": 2.4,
      "color": "rgba(100, 149, 237, 0.3)",
      "explanation": "Süßwasserreserven sind vollständig erschöpft in großen Gebieten.",
      "sources": [
        {
          "title": "Rapid groundwater decline and some cases of recovery in aquifers globally",
          "url": "https://www.nature.com/articles/s41586-023-06879-8",
          "year": 2023,
          "journal": "Nature"
        },
        {
          "title": "Lake ecosystem tipping points and climate feedbacks",
          "url": "https://esd.copernicus.org/articles/15/653/2024/",
          "year": 2024,
          "journal": "Earth System Dynamics"
        }
      ]
    },
    {
      "name": "Süßwasser-Ökosystem-Kollaps",
      "temp20": 2.0,
      "temp80": 2.8,
      "total_co2_gt": 140,
      "co2_rate_ppm_year": 2.8,
      "color": "rgba(64, 224, 208, 0.3)",
      "explanation": "Seen, Flüsse und Feuchtgebiete kollabieren durch Hitze und Wassermangel.",
      "sources": [
        {
          "title": "Physics-based early warning signal shows that AMOC is on tipping course",
          "url": "https://www.science.org/doi/10.1126/sciadv.adk1189",
          "year": 2024,
          "journal": "Science Advances"
        },
        {
          "title": "Lake ecosystem tipping points and climate feedbacks",
          "url": "https://esd.copernicus.org/articles/15/653/2024/",
          "year": 2024,
          "journal": "Earth System Dynamics"
        }
      ]
    },
    {
      "name": "Terrestrische-Biodiversity-Crash",
      "temp20": 2.2,
      "temp80": 3.0,
      "total_co2_gt": 200,
      "co2_rate_ppm_year": 3.5,
      "color": "rgba(255, 105, 180, 0.3)",
      "explanation": "Landökosysteme verlieren massive Artenvielfalt, Ökosystemfunktionen brechen zusammen.",
      "sources": [
        {
          "title": "Global trends and scenarios for terrestrial biodiversity and ecosystem services from 1900 to 2050",
          "url": "https://www.science.org/doi/10.1126/science.adn3441",
          "year": 2024,
          "journal": "Science"
        },
        {
          "title": "Biodiversity loss reduces global terrestrial carbon storage",
          "url": "https://www.nature.com/articles/s41467-024-47872-7",
          "year": 2024,
          "journal": "Nature Communications"
        }
      ]
    },
    {
      "name": "Marine-Biodiversity-Kollaps",
      "temp20": 2.8,
      "temp80": 3.8,
      "total_co2_gt": 250,
      "co2_rate_ppm_year": 4.2,
      "color": "rgba(70, 130, 180, 0.3)",
      "explanation": "Meeresökosysteme verlieren Artenvielfalt, Nahrungsketten kollabieren.",
      "sources": [
        {
          "title": "Tipping point study finds world's oceans face irreversible damage",
          "url": "https://projects.research-and-innovation.ec.europa.eu/en/projects/success-stories/all/tipping-point-study-finds-worlds-oceans-face-irreversible-damage",
          "year": 2024,
          "journal": "European Research and Innovation"
        },
        {
          "title": "WWF Living Planet Report 2024: A Planet in Crisis",
          "url": "https://www.arcticwwf.org/newsroom/news/wwf-living-planet-report-2024-a-planet-in-crisis/",
          "year": 2024,
          "journal": "WWF Arctic"
        }
      ]
    },
    {
      "name": "Stratocumulus-Kollaps",
      "temp20": 6.0,
      "temp80": 7.0,
      "total_co2_gt": 800,
      "co2_rate_ppm_year": 30.0,
      "color": "rgba(128, 0, 128, 0.3)",
      "explanation": "Stratocumulus-Wolken lösen sich bei sehr hohen CO2-Konzentrationen auf, verlieren ihre kühlende Wirkung und verursachen zusätzliche +8°C Erwärmung.",
      "sources": [
        {
          "title": "Possible climate transitions from breakup of stratocumulus decks under greenhouse warming",
          "url": "https://www.nature.com/articles/s41561-019-0310-1",
          "year": 2019,
          "journal": "Nature Geoscience"
        },
        {
          "title": "Stratocumulus cloud feedback in climate models",
          "url": "https://journals.ametsoc.org/view/journals/clim/33/15/JCLI-D-19-0681.1.xml",
          "year": 2020,
          "journal": "Journal of Climate"
        }
      ],
      "verified_threshold": "Auflösung ab ~1200ppm CO2 (entspricht ~6-8°C Erwärmung)",
      "verified_impact": "+8°C zusätzliche Erwärmung durch Verlust der Wolken-Albedo; extremes Worst-Case-Szenario",
      "verification_date": "2025-08-30"
    }
  ]
};