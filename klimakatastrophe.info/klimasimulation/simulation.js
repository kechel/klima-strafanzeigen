/**
 * Klimasimulation - Berechnet Jahr-für-Jahr CO2 und Temperaturentwicklung
 */

// CO2-TEMPERATUR KONVERTIERUNGSFUNKTIONEN
function co2ToTemperature(co2_ppm) {
    // IPCC-Standard: T = 3°C * log₂(CO2/280ppm) 
    // 3.0 = Klimasensitivität, 280 = vorindustrieller CO2-Wert
    return 3.0 * Math.log(co2_ppm / 280) / Math.log(2);
}

function temperatureToCo2(temperature) {
    // Umgekehrte Formel: CO2 = 280 * 2^(T/3)
    return 280 * Math.pow(2, temperature / 3.0);
}

// JAHR-FÜR-JAHR KIPPUNKT-SIMULATION
function simulateYearByYear(tippingPointsToUse, probabilityThreshold = 20) {
    const results = {
        years: [],
        co2Values: [],
        temperatures: [],
        activeTippingPoints: [],
        cumulativeEmissions: []
    };
    
    // Startwerte für 2025
    let currentYear = 2025;
    let currentCO2 = 425; // ppm
    let activeTippingPoints = new Set();
    let tippingPointContributions = new Map(); // Tracking der Beiträge
    
    
    // Simulation von 2025 bis 2300 (um alle Kippunkte zu erfassen)
    while (currentYear <= 2300) {
        // Aktuelle Temperatur aus CO2 berechnen
        const currentTemp = co2ToTemperature(currentCO2);
        
        // Prüfe neue Kippunkt-Aktivierungen (basierend auf dynamischer Temperaturschwelle)
        tippingPointsToUse.forEach(tp => {
            // Berechne dynamische Temperaturschwelle basierend auf Wahrscheinlichkeit
            // Erweiterte Interpolation für 0% bis 100%
            const temp20 = tp.temp20;
            const temp80 = tp.temp80 || (tp.temp20 + 0.5); // Fallback falls temp80 nicht definiert
            
            // Begrenzte Interpolation nur zwischen 20%-80% (wissenschaftlich belegte Range)
            const dynamicThreshold = temp20 + (temp80 - temp20) * (probabilityThreshold - 20) / 60;
            
            if (!activeTippingPoints.has(tp.name) && 
                currentTemp >= dynamicThreshold) {
                
                // Verwende total_co2_gt aus JSON
                const totalGtC = tp.total_co2_gt || 100; // Fallback: 100 Gt C
                const rateGtCPerYear = tp.co2_rate_ppm_year * 2.13; // Konvertiere ppm/Jahr zu Gt C/Jahr
                const durationYears = Math.round(totalGtC / rateGtCPerYear);
                const endYear = currentYear + durationYears;
                
                activeTippingPoints.add(tp.name);
                tippingPointContributions.set(tp.name, {
                    startYear: currentYear,
                    endYear: endYear,
                    rateGtCPerYear: rateGtCPerYear,
                    totalEmitted: 0
                });
                
            }
        });
        
        // Berechne jährliche CO2-Beiträge aller aktiven Kippunkte
        let totalTippingCO2ThisYear = 0;
        
        for (let [tpName, contribution] of tippingPointContributions) {
            if (currentYear >= contribution.startYear && currentYear <= contribution.endYear) {
                const yearlyEmissionGtC = contribution.rateGtCPerYear;
                const yearlyEmissionPPM = yearlyEmissionGtC / 2.13; // Konvertierung zurück zu ppm
                
                totalTippingCO2ThisYear += yearlyEmissionPPM;
                contribution.totalEmitted += yearlyEmissionGtC;
            }
        }
        
        // Basis-Emissionen (menschlich + andere Quellen) - reduzieren sich über Zeit
        let baseEmissions = 2.5; // ppm/Jahr Startwert
        
        // Basis-Emissionen reduzieren sich langsam (optimistisches Szenario)
        const yearsSince2025 = currentYear - 2025;
        const reductionFactor = Math.max(0.3, 1 - (yearsSince2025 * 0.01)); // 1% Reduktion pro Jahr, Minimum 30%
        baseEmissions *= reductionFactor;
        
        // Gesamte CO2-Zunahme für dieses Jahr
        const totalCO2Increase = baseEmissions + totalTippingCO2ThisYear;
        currentCO2 += totalCO2Increase;
        
        // Speichere Jahreswerte
        results.years.push(currentYear);
        results.co2Values.push(currentCO2);
        results.temperatures.push(currentTemp);
        results.activeTippingPoints.push([...activeTippingPoints]);
        results.cumulativeEmissions.push(totalCO2Increase);
        
        currentYear++;
    }
    
    // Finale Statistiken
    const finalCO2 = results.co2Values[results.co2Values.length - 1];
    const finalTemp = results.temperatures[results.temperatures.length - 1];
    const totalIncrease = finalCO2 - 425;
    const year2100Index = results.years.indexOf(2100);
    const co2_2100 = year2100Index !== -1 ? results.co2Values[year2100Index] : 'N/A';
    const temp_2100 = year2100Index !== -1 ? results.temperatures[year2100Index] : 'N/A';
    
    
    return results;
}

// CHART-DATEN VORBEREITUNG
function prepareChartData(simulationResults, nettoNullYear = null) {
    // Chart-Labels
    const chartLabels = ['2000', '2010', '2020', '2024', '2030', '2040', '2050', '2060', '2070', '2080', '2090', '2100', '2120', '2150', '2200', '2250', '2300'];
    
    // CO2 und Temperatur-Daten aus Simulation extrahieren
    const co2DataWithTipping = [];
    const tempData = [];
    
    // Berechne CO2-Kurve OHNE Kippunkte (aber mit Netto-Null-Jahr berücksichtigung)
    const co2DataWithoutTipping = [];
    
    chartLabels.forEach(labelStr => {
        const year = parseInt(labelStr);
        const simIndex = simulationResults.years.indexOf(year);
        
        if (simIndex !== -1) {
            // Verwende Simulationsdaten
            co2DataWithTipping.push(simulationResults.co2Values[simIndex]);
            tempData.push(simulationResults.temperatures[simIndex]);
        } else {
            // Fallback für fehlende Jahre
            if (year <= 2024) {
                co2DataWithTipping.push(year === 2000 ? 370 : year === 2010 ? 390 : year === 2020 ? 410 : 425);
                tempData.push(year === 2000 ? 0.6 : year === 2010 ? 0.9 : year === 2020 ? 1.2 : 1.75);
            } else {
                // Interpoliere aus letzten verfügbaren Daten
                const lastCO2 = co2DataWithTipping[co2DataWithTipping.length - 1] || 425;
                const lastTemp = tempData[tempData.length - 1] || 1.75;
                co2DataWithTipping.push(lastCO2);
                tempData.push(lastTemp);
            }
        }
        
        // Berechne CO2 OHNE Kippunkte (nur menschliche Emissionen)
        if (year <= 2024) {
            co2DataWithoutTipping.push(year === 2000 ? 370 : year === 2010 ? 390 : year === 2020 ? 410 : 425);
        } else {
            const nettoNullYearNumber = nettoNullYear === "nie" ? 2299 : (nettoNullYear ? parseInt(nettoNullYear) : 2299);
            
            if (year < nettoNullYearNumber) {
                // Vor Netto-Null: Normale CO2-Reduktion
                let baseCO2 = 425; // Startwert 2025
                const yearsSince2025 = year - 2025;
                
                // Berechne akkumulierte menschliche Emissionen mit Reduktion
                let totalAdditionalCO2 = 0;
                for (let y = 2025; y <= year; y++) {
                    const yearsSinceStart = y - 2025;
                    let baseEmissions = 2.5; // ppm/Jahr Startwert
                    const reductionFactor = Math.max(0.3, 1 - (yearsSinceStart * 0.01)); // 1% Reduktion pro Jahr
                    baseEmissions *= reductionFactor;
                    totalAdditionalCO2 += baseEmissions;
                }
                
                co2DataWithoutTipping.push(425 + totalAdditionalCO2);
            } else {
                // Nach Netto-Null: CO2 bleibt konstant (keine weiteren menschlichen Emissionen)
                const lastValueBeforeNettoNull = co2DataWithoutTipping[co2DataWithoutTipping.length - 1] || 425;
                co2DataWithoutTipping.push(lastValueBeforeNettoNull);
            }
        }
    });
    
    return {
        co2DataWithTipping,
        co2DataWithoutTipping, // Neue CO2-Kurve ohne Kippunkte
        tempData
    };
}

// WRAPPER-FUNKTION FÜR EXTERNE AUFRUFE
function runSimulation(probabilityThreshold = 20) {
    // Verwende die globalen Kippunkt-Daten - diese sollten von der HTML-Seite gesetzt werden
    if (!window.baseTippingPoints || window.baseTippingPoints.length === 0) {
        console.error('❌ Keine Kippunkt-Daten verfügbar. Daten müssen zuerst geladen werden.');
        throw new Error('Kippunkt-Daten nicht verfügbar');
    }
    
    return simulateYearByYear(window.baseTippingPoints, probabilityThreshold);
}

// NETTO-NULL-SIMULATION
function runSimulationWithNettoNull(probabilityThreshold = 20, nettoNullYear = "nie") {
    if (!window.baseTippingPoints || window.baseTippingPoints.length === 0) {
        console.error('❌ Keine Kippunkt-Daten verfügbar. Daten müssen zuerst geladen werden.');
        throw new Error('Kippunkt-Daten nicht verfügbar');
    }
    
    return simulateYearByYearWithNettoNull(window.baseTippingPoints, probabilityThreshold, nettoNullYear);
}

// JAHR-FÜR-JAHR SIMULATION MIT NETTO-NULL-JAHR
function simulateYearByYearWithNettoNull(tippingPointsToUse, probabilityThreshold = 20, nettoNullYear = "nie") {
    const results = {
        years: [],
        co2Values: [],
        temperatures: [],
        activeTippingPoints: [],
        cumulativeEmissions: []
    };
    
    // Startwerte für 2025
    let currentYear = 2025;
    let currentCO2 = 425; // ppm
    let activeTippingPoints = new Set();
    let tippingPointContributions = new Map(); // Tracking der Beiträge
    
    // Parse Netto-Null-Jahr
    const nettoNullYearNumber = nettoNullYear === "nie" ? 2299 : parseInt(nettoNullYear);
    
    console.log(`🌱 Netto-Null-Simulation: Menschliche Emissionen stoppen ab ${nettoNullYear}`);
    
    // Simulation von 2025 bis 2300 (um alle Kippunkte zu erfassen)
    while (currentYear <= 2300) {
        // Aktuelle Temperatur aus CO2 berechnen
        const currentTemp = co2ToTemperature(currentCO2);
        
        // Prüfe neue Kippunkt-Aktivierungen (basierend auf dynamischer Temperaturschwelle)
        tippingPointsToUse.forEach(tp => {
            // Berechne dynamische Temperaturschwelle basierend auf Wahrscheinlichkeit
            const temp20 = tp.temp20;
            const temp80 = tp.temp80 || (tp.temp20 + 0.5); // Fallback falls temp80 nicht definiert
            
            // Begrenzte Interpolation nur zwischen 20%-80% (wissenschaftlich belegte Range)
            const dynamicThreshold = temp20 + (temp80 - temp20) * (probabilityThreshold - 20) / 60;
            
            if (!activeTippingPoints.has(tp.name) && 
                currentTemp >= dynamicThreshold) {
                
                // Verwende total_co2_gt aus JSON
                const totalGtC = tp.total_co2_gt || 100; // Fallback: 100 Gt C
                const rateGtCPerYear = tp.co2_rate_ppm_year * 2.13; // Konvertiere ppm/Jahr zu Gt C/Jahr
                const durationYears = Math.round(totalGtC / rateGtCPerYear);
                const endYear = currentYear + durationYears;
                
                activeTippingPoints.add(tp.name);
                tippingPointContributions.set(tp.name, {
                    startYear: currentYear,
                    endYear: endYear,
                    rateGtCPerYear: rateGtCPerYear,
                    totalEmitted: 0
                });
                
                console.log(`🔥 Kippunkt aktiviert: ${tp.name} bei ${currentTemp.toFixed(2)}°C (Jahr ${currentYear})`);
            }
        });
        
        // Berechne jährliche CO2-Beiträge aller aktiven Kippunkte
        let totalTippingCO2ThisYear = 0;
        
        for (let [tpName, contribution] of tippingPointContributions) {
            if (currentYear >= contribution.startYear && currentYear <= contribution.endYear) {
                const yearlyEmissionGtC = contribution.rateGtCPerYear;
                const yearlyEmissionPPM = yearlyEmissionGtC / 2.13; // Konvertierung zurück zu ppm
                
                totalTippingCO2ThisYear += yearlyEmissionPPM;
                contribution.totalEmitted += yearlyEmissionGtC;
            }
        }
        
        // Basis-Emissionen (menschlich) - STOPPEN nach Netto-Null-Jahr!
        let baseEmissions = 0; // ppm/Jahr
        
        if (currentYear < nettoNullYearNumber) {
            // Vor Netto-Null: Normale Reduktion
            baseEmissions = 2.5; // ppm/Jahr Startwert
            const yearsSince2025 = currentYear - 2025;
            const reductionFactor = Math.max(0.3, 1 - (yearsSince2025 * 0.01)); // 1% Reduktion pro Jahr, Minimum 30%
            baseEmissions *= reductionFactor;
        } else {
            // Nach Netto-Null: Keine menschlichen Emissionen mehr!
            baseEmissions = 0;
        }
        
        // Gesamte CO2-Zunahme für dieses Jahr
        const totalCO2Increase = baseEmissions + totalTippingCO2ThisYear;
        currentCO2 += totalCO2Increase;
        
        // Speichere Jahreswerte
        results.years.push(currentYear);
        results.co2Values.push(currentCO2);
        results.temperatures.push(currentTemp);
        results.activeTippingPoints.push([...activeTippingPoints]);
        results.cumulativeEmissions.push(totalCO2Increase);
        
        currentYear++;
    }
    
    console.log(`🏁 Simulation beendet. Finale CO2: ${results.co2Values[results.co2Values.length - 1].toFixed(1)} ppm`);
    console.log(`🏁 Finale Temperatur: ${results.temperatures[results.temperatures.length - 1].toFixed(2)}°C`);
    
    return results;
}

// Globale Exports
window.ClimateSimulation = {
    co2ToTemperature,
    temperatureToCo2,
    simulateYearByYear,
    simulateYearByYearWithNettoNull,
    prepareChartData,
    runSimulation,
    runSimulationWithNettoNull
};