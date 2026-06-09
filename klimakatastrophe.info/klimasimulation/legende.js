/**
 * Legende-Management - Generiert und verwaltet die Kippunkt-Legende
 */

// Erklärungen kommen jetzt direkt aus den Kippunkt-Daten (kippunkte-daten.js)

// Automatische Legende-Generierung
function generateLegend(chart) {
    const baseTippingPoints = window.baseTippingPoints || [];
    if (baseTippingPoints.length === 0) {
        console.warn('⚠️ Keine Kippunkt-Daten für Legende verfügbar');
        return;
    }

    // Sortiere nach Temperaturschwelle
    const sortedTippingPoints = [...baseTippingPoints].sort((a, b) => a.temp20 - b.temp20);
    
    // Generiere HTML für jede Kippunkt-Legende
    const legendGrid = document.getElementById('legend-grid');
    if (!legendGrid) {
        console.warn('⚠️ Element #legend-grid nicht gefunden');
        return;
    }
    
    legendGrid.innerHTML = '';
    
    // Erweitere alle Kippunkte mit berechneten Werten
    const enrichedSortedTippingPoints = sortedTippingPoints.map(tp => {
        const temp50 = Math.round((tp.temp20 + 0.1) * 10) / 10;
        const temp80 = Math.round((tp.temp20 + 0.2) * 10) / 10;
        const currentTemp2024 = 3.0 * Math.log(425 / 280) / Math.log(2); // Berechne aus CO2
        const status = tp.temp20 <= currentTemp2024 ? '✓ BEREITS EINGETRETEN' : 
                      tp.temp20 <= 2.0 ? '⚠ KURZ BEVOR' : 
                      tp.temp20 <= 3.0 ? '→ Bei höherer Erwärmung' : '→ Bei extremer Erwärmung';
        const co2_gt_per_year = Math.round(tp.co2_rate_ppm_year * 2.13 * 10) / 10;
        
        return {
            ...tp,
            temp50,
            temp80, 
            status,
            co2_gt_per_year
        };
    });

    enrichedSortedTippingPoints.forEach((tp, index) => {
        // Verwende explanation aus Daten
        const explanation = tp.explanation || 'Wissenschaftliche Erklärung wird recherchiert...';
        
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        // Berechne Simulationswerte für diesen Kippunkt
        let simulationInfo = 'Nicht aktiviert in Simulation';
        let activationYearText = ' (nicht aktiviert)';
        
        // Suche nach diesem Kippunkt in den Simulationsergebnissen
        let isActivated = false;
        const simulationResults = window.cachedSimulationResults;
        if (simulationResults) {
            for (let year of simulationResults.years) {
                const yearIndex = simulationResults.years.indexOf(year);
                const activeTippingPoints = simulationResults.activeTippingPoints[yearIndex];
                
                if (activeTippingPoints && activeTippingPoints.includes(tp.name)) {
                    const activationYear = year;
                    isActivated = true;
                    
                    // Berechne End-Jahr basierend auf total_co2_gt und Rate
                    const totalGtC = tp.total_co2_gt || 100;
                    const rateGtCPerYear = tp.co2_rate_ppm_year * 2.13;
                    const durationYears = Math.round(totalGtC / rateGtCPerYear);
                    const endYear = activationYear + durationYears;
                    
                    simulationInfo = `${activationYear}-${endYear} (${durationYears} Jahre)`;
                    activationYearText = ` (${activationYear}-${endYear})`;
                    
                    // Setze dynamicYearStart für Statusanzeige
                    tp.dynamicYearStart = activationYear;
                    break;
                }
            }
        }
        
        // Berechne Kaskaden-Effekt: Würde dieser Kippunkt durch vorherige ausgelöst, selbst bei Netto-Null?
        let cascadeInfo = null;
        // Prüfe für alle Kippunkte (auch aktivierte)
        cascadeInfo = calculateCascadeEffect(tp, enrichedSortedTippingPoints.slice(0, index), simulationResults);
        
        // Berechne wie viele nachfolgende Kippunkte DIESER Kippunkt auslösen würde
        const cascadeCount = calculateCascadeCount(tp, index, enrichedSortedTippingPoints, simulationResults);
        
        let legendContent = `
            <div class="legend-item-header">
                <div class="legend-box" style="background-color: ${tp.color.replace('0.3', '0.6')};"></div>
                <strong>#${index + 1} ${tp.name}${activationYearText}</strong>
            </div>
            <div class="legend-item-explanation" style="margin-bottom: 8px;">${explanation}</div>
            <div style="font-size: 0.85rem; color: #666; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div><strong>Temperaturschwellen:</strong><br>20%: ${tp.temp20}°C | 80%: ${tp.temp80}°C</div>
                <div><strong>CO2-Reservoir:</strong><br>${tp.total_co2_gt} Gt C | Rate: ${tp.co2_rate_ppm_year} ppm/Jahr</div>
            </div>
            ${cascadeCount > 0 ? `
                <div style="margin-top: 8px; padding: 4px; background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; font-size: 11px;">
                    🌊 <strong>Kaskaden-Effekt:</strong> Löst ${cascadeCount} weitere Kippunkte aus
                </div>
            ` : ''}
        `;
        
        // Bestimme Status basierend auf aktueller Temperatur (berechnet aus aktuellem CO2) und Wahrscheinlichkeitsschwelle
        const currentCO2_2024 = 425; // ppm für 2024
        const currentTemperature = 3.0 * Math.log(currentCO2_2024 / 280) / Math.log(2); // IPCC-Formel
        const temp20 = tp.temp20;
        const temp80 = tp.temp80 || (temp20 + 0.5);
        
        // Hole aktuelle Wahrscheinlichkeitsschwelle
        const activeButton = document.querySelector('.prob-btn.active');
        const currentProbability = activeButton ? parseInt(activeButton.getAttribute('data-prob')) : 20;
        const currentThreshold = temp20 + (temp80 - temp20) * (currentProbability - 20) / 60;
        
        const isAlreadyOccurred = currentTemperature >= currentThreshold;
        
        // ENTWEDER "bereits eingetreten" ODER "unvermeidlich durch Kaskade" - niemals beides
        if (isAlreadyOccurred) {
            // Bereits heute eingetreten (basierend auf gewählter Wahrscheinlichkeitsschwelle)
            legendContent += `
                <div style="margin-top: 8px; padding: 4px; background: rgba(46, 204, 113, 0.1); border-left: 3px solid #2ecc71; font-size: 11px;">
                    ✅ <strong>Status:</strong> Bereits heute eingetreten
                </div>
            `;
        } else if (cascadeInfo && cascadeInfo.isInevitable) {
            // Nur wenn NICHT bereits eingetreten: Zeige Kaskaden-Info
            legendContent += `
                <div style="margin-top: 8px; padding: 4px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; font-size: 11px;">
                    🔗 <strong>Unvermeidlich:</strong> Durch ${cascadeInfo.triggerTippingPoint} (${cascadeInfo.firstSufficientName}) ausgelöst
                </div>
            `;
        } else if (!isActivated) {
            // Zeige "nicht erreicht" nur wenn weder bereits eingetreten noch unvermeidlich durch Kaskade
            legendContent += `
                <div style="margin-top: 8px; padding: 4px; background: rgba(158, 158, 158, 0.1); border-left: 3px solid #9e9e9e; font-size: 11px;">
                    ❌ <strong>Status:</strong> Nicht erreicht bis 2300
                </div>
            `;
        }
        
        if (isActivated) {
            // Für zukünftige Kippunkte (die nur in der Simulation aktiviert werden) zeigen wir nichts extra
            
            // Zeige zusätzlich signifikante Abweichungen von ursprünglicher Schätzung
            if (tp.dynamicYearStart && tp.year_start) {
                const yearDifference = tp.year_start - tp.dynamicYearStart;
                
                if (Math.abs(yearDifference) > 2) {
                    const effectText = yearDifference > 0 ? `${yearDifference} Jahre früher` : `${Math.abs(yearDifference)} Jahre später`;
                    legendContent += `
                        <div style="margin-top: 8px; padding: 4px; background: rgba(255, 107, 53, 0.1); border-left: 3px solid #ff6b35; font-size: 11px;">
                            ⚡ <strong>Abweichung:</strong> ${effectText} als ursprünglich geplant
                        </div>
                    `;
                }
            }
        }
        
        legendItem.innerHTML = legendContent;
        
        // Click-Handler für Legende -> Chart Highlight
        legendItem.style.cursor = 'pointer';
        legendItem.dataset.tippingPointName = tp.name; // Store exact name for precise matching
        legendItem.addEventListener('click', () => {
            console.log(`🎯 Legende-Klick auf: ${tp.name} (Index: ${index})`);
            window.ClimateChart.highlightTippingPoint(chart, tp.name);
            
            // Synchronisiere den Pfeiltasten-Index mit dem angeklickten Element
            window.ClimateChart.setCurrentTippingPointIndex(index);
            
            // Visuelle Feedback für geklickten Legendeneintrag
            document.querySelectorAll('.legend-item').forEach((item, itemIndex) => {
                item.style.backgroundColor = '';
                item.style.boxShadow = '';
                item.style.transform = '';
                item.classList.remove('legend-item-active');
                console.log(`  Reset Item ${itemIndex}`);
            });
            
            // Aktiviere das geklickte Element mit gelblichem Hintergrund
            legendItem.style.backgroundColor = 'rgba(255, 235, 59, 0.3)'; // Gelblich
            legendItem.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
            legendItem.style.transform = 'scale(1.02)';
            legendItem.style.transition = 'all 0.2s ease';
            legendItem.classList.add('legend-item-active');
            console.log(`  Aktiviert Item ${index} (${tp.name})`);
            
            // Zeige Info-Box für den ausgewählten Kippunkt
            const totalTippingPoints = enrichedSortedTippingPoints.length;
            if (window.showTippingPointInfo) {
                window.showTippingPointInfo(tp, index + 1, totalTippingPoints);
            }
        });
        
        legendGrid.appendChild(legendItem);
    });
}

// Reset Button Handler
function setupResetButton(chart) {
    const resetButton = document.getElementById('reset-highlight');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            window.ClimateChart.clearHighlight(chart);
            
            // Reset Pfeiltasten-Index
            if (window.ClimateChart.setCurrentTippingPointIndex) {
                window.ClimateChart.setCurrentTippingPointIndex(-1);
            }
            
            // Entferne alle Legende Highlights
            document.querySelectorAll('.legend-item').forEach(item => {
                item.style.backgroundColor = '';
                item.style.boxShadow = '';
                item.style.transform = '';
                item.classList.remove('legend-item-active');
            });
            
            // Verstecke Info-Box
            if (window.hideTippingPointInfo) {
                window.hideTippingPointInfo();
            }
        });
    }
}

// Berechne ob ein Kippunkt durch bereits aktive Kippunkte unvermeidlich wird
function calculateCascadeEffect(targetTippingPoint, previousTippingPoints, simulationResults) {
    
    if (!simulationResults || previousTippingPoints.length === 0) {
        return null;
    }
    
    // Hole aktuelle Wahrscheinlichkeitsschwelle
    const activeButton = document.querySelector('.prob-btn.active');
    const currentProbability = activeButton ? parseInt(activeButton.getAttribute('data-prob')) : 20;
    
    // Hole aktuelles Netto-Null-Jahr
    const activeNettoButton = document.querySelector('.netz-btn.active');
    const nettoNullYear = activeNettoButton ? activeNettoButton.getAttribute('data-year') : "nie";
    
    // Berechne dynamische Temperaturschwelle für Ziel-Kippunkt
    const temp20 = targetTippingPoint.temp20;
    const temp80 = targetTippingPoint.temp80 || (temp20 + 0.5);
    const targetThreshold = temp20 + (temp80 - temp20) * (currentProbability - 20) / 60;
    
    // Erstelle Liste der aktivierten Kippunkte (nach Index sortiert)
    let activatedPreviousTippingPoints = [];
    
    for (let i = 0; i < previousTippingPoints.length; i++) {
        const prevTp = previousTippingPoints[i];
        // Prüfe ob dieser Kippunkt in der Simulation aktiviert wurde
        let isActivatedInSimulation = false;
        
        if (simulationResults) {
            for (let year of simulationResults.years) {
                const yearIndex = simulationResults.years.indexOf(year);
                const activeTippingPoints = simulationResults.activeTippingPoints[yearIndex];
                
                if (activeTippingPoints && activeTippingPoints.includes(prevTp.name)) {
                    isActivatedInSimulation = true;
                    break;
                }
            }
        }
        
        if (isActivatedInSimulation) {
            activatedPreviousTippingPoints.push({
                name: prevTp.name,
                co2Contribution: prevTp.total_co2_gt || 0,
                index: i + 1 // 1-basiert für Anzeige
            });
        }
    }
    
    
    if (activatedPreviousTippingPoints.length === 0) {
        return null;
    }
    
    // Finde minimalen Satz von Kippunkten, der zur Auslösung ausreicht
    let cumulativeCO2 = 0;
    let firstSufficientIndex = null;
    let firstSufficientName = null;
    
    for (let i = 0; i < activatedPreviousTippingPoints.length; i++) {
        const tp = activatedPreviousTippingPoints[i];
        cumulativeCO2 += tp.co2Contribution;
        
        // Teste ob diese Menge bereits ausreicht
        const additionalTippingCO2_ppm = cumulativeCO2 / 2.13; // Gt C zu ppm Konversion
        const currentCO2_ppm = 425;
        
        // Füge menschliche Emissionen bis Netto-Null-Jahr hinzu
        const nettoNullYearNumber = nettoNullYear === "nie" ? 2299 : parseInt(nettoNullYear);
        let additionalHumanCO2 = 0;
        
        if (nettoNullYearNumber > 2025) {
            // Berechne akkumulierte menschliche Emissionen bis Netto-Null
            for (let year = 2025; year < nettoNullYearNumber; year++) {
                const yearsSince2025 = year - 2025;
                let baseEmissions = 2.5; // ppm/Jahr Startwert
                const reductionFactor = Math.max(0.3, 1 - (yearsSince2025 * 0.01)); // 1% Reduktion pro Jahr
                baseEmissions *= reductionFactor;
                additionalHumanCO2 += baseEmissions;
            }
        }
        
        const finalCO2_ppm = currentCO2_ppm + additionalHumanCO2 + additionalTippingCO2_ppm;
        const finalTemperature = 3.0 * Math.log(finalCO2_ppm / 280) / Math.log(2);
        
        
        if (finalTemperature >= targetThreshold) {
            firstSufficientIndex = tp.index;
            firstSufficientName = tp.name;
            break;
        }
    }
    
    if (firstSufficientIndex === null) {
        return null;
    }
    
    // Verwende die bereits gefundenen Werte für den Return
    return {
        isInevitable: true,
        triggerTippingPoint: `Kippunkt #${firstSufficientIndex}`,
        firstSufficientName: firstSufficientName,
        estimatedYear: "unvermeidlich",
        finalTemperature: Math.round(cumulativeCO2 * 10) / 10, // Verwende kumulative CO2
        totalCO2: Math.round(cumulativeCO2),
        explanation: `Bereits Kippunkt #${firstSufficientIndex} (${firstSufficientName}) würde durch Kaskade diesen Kippunkt auslösen.`
    };
    
}

// Cache für aktivierte Kippunkte (Performance-Optimierung)
let cachedActivatedTippingPoints = null;
let cachedSimulationResults = null;

// Cache-Reset-Funktion
function resetCascadeCache() {
    cachedActivatedTippingPoints = null;
    cachedSimulationResults = null;
}

// Berechne wie viele Kippunkte durch einen gegebenen Kippunkt ausgelöst werden
function calculateCascadeCount(triggerTippingPoint, triggerIndex, allTippingPoints, simulationResults) {
    
    if (!simulationResults) {
        return 0;
    }
    
    // Performance: Cache für aktivierte Kippunkte
    if (cachedSimulationResults !== simulationResults) {
        cachedActivatedTippingPoints = new Set();
        cachedSimulationResults = simulationResults;
        
        // Einmalig alle aktivierten Kippunkte sammeln
        for (let year of simulationResults.years) {
            const yearIndex = simulationResults.years.indexOf(year);
            const activeTippingPoints = simulationResults.activeTippingPoints[yearIndex];
            
            if (activeTippingPoints) {
                activeTippingPoints.forEach(name => cachedActivatedTippingPoints.add(name));
            }
        }
    }
    
    // Hole aktuelle Parameter
    const activeButton = document.querySelector('.prob-btn.active');
    const currentProbability = activeButton ? parseInt(activeButton.getAttribute('data-prob')) : 20;
    
    const activeNettoButton = document.querySelector('.netz-btn.active');
    const nettoNullYear = activeNettoButton ? activeNettoButton.getAttribute('data-year') : "nie";
    
    // NOTE: Wir berechnen potentielle Kaskaden-Effekte, nicht nur aktuelle
    // Die Anzeige "Löst X weitere Kippunkte aus" soll zeigen was passieren WÜRDE
    // nicht nur was in der aktuellen Simulation passiert ist
    
    // Berechne CO2 aus diesem Kippunkt plus allen vorherigen aktivierten
    let totalCO2FromPreviousAndThis = 0;
    
    // Sammle CO2 von allen aktivierten Kippunkten bis einschließlich diesem (mit Cache)
    for (let i = 0; i <= triggerIndex; i++) {
        const tp = allTippingPoints[i];
        
        if (i === triggerIndex) {
            // Für den auslösenden Kippunkt: Immer einbeziehen (auch wenn nicht aktiviert)
            totalCO2FromPreviousAndThis += tp.total_co2_gt || 0;
        } else if (cachedActivatedTippingPoints.has(tp.name)) {
            // Für vorherige Kippunkte: Nur wenn aktiviert
            totalCO2FromPreviousAndThis += tp.total_co2_gt || 0;
        }
    }
    
    
    // Berechne resultierende Temperatur
    const currentCO2_ppm = 425;
    const nettoNullYearNumber = nettoNullYear === "nie" ? 2299 : parseInt(nettoNullYear);
    
    // Berechne menschliche Emissionen bis Netto-Null
    let additionalHumanCO2 = 0;
    if (nettoNullYearNumber > 2025) {
        // Berechne menschliche Emissionen bis Netto-Null-Jahr
        for (let year = 2025; year < nettoNullYearNumber; year++) {
            const yearsSince2025 = year - 2025;
            let baseEmissions = 2.5; // ppm/Jahr Startwert
            const reductionFactor = Math.max(0.3, 1 - (yearsSince2025 * 0.01)); // 1% Reduktion pro Jahr
            baseEmissions *= reductionFactor;
            additionalHumanCO2 += baseEmissions;
        }
    }
    
    const additionalTippingCO2_ppm = totalCO2FromPreviousAndThis / 2.13; // Gt C zu ppm
    const finalCO2_ppm = currentCO2_ppm + additionalHumanCO2 + additionalTippingCO2_ppm;
    const finalTemperature = 3.0 * Math.log(finalCO2_ppm / 280) / Math.log(2);
    
    
    // Berechne Temperatur OHNE diesen spezifischen Kippunkt (nur mit vorherigen)
    let totalCO2WithoutThis = totalCO2FromPreviousAndThis - (triggerTippingPoint.total_co2_gt || 0);
    const additionalTippingCO2WithoutThis_ppm = totalCO2WithoutThis / 2.13;
    const finalCO2WithoutThis_ppm = currentCO2_ppm + additionalHumanCO2 + additionalTippingCO2WithoutThis_ppm;
    const finalTemperatureWithoutThis = 3.0 * Math.log(finalCO2WithoutThis_ppm / 280) / Math.log(2);
    
    
    // Zähle nur nachfolgende Kippunkte, die DURCH DIESEN spezifischen Kippunkt zusätzlich ausgelöst würden
    let cascadeCount = 0;
    
    // Prüfe alle nachfolgenden Kippunkte (Performance-Begrenzung entfernt für korrekte Kaskaden)
    const maxCascadeCheck = allTippingPoints.length;
    
    for (let i = triggerIndex + 1; i < maxCascadeCheck; i++) {
        const nextTp = allTippingPoints[i];
        
        // Berechne dynamische Schwelle für nachfolgenden Kippunkt
        const temp20 = nextTp.temp20;
        const temp80 = nextTp.temp80 || (temp20 + 0.5);
        const threshold = temp20 + (temp80 - temp20) * (currentProbability - 20) / 60;
        
        // Prüfe: Würde ohne diesen Kippunkt NICHT ausgelöst, aber mit ihm schon?
        const wouldTriggerWithout = finalTemperatureWithoutThis >= threshold;
        const wouldTriggerWith = finalTemperature >= threshold;
        
        if (!wouldTriggerWithout && wouldTriggerWith) {
            cascadeCount++;
        } else if (wouldTriggerWithout) {
            // Reduziere Logging für bessere Performance
            // console.log(`  ⚪ Bereits ohne ${triggerTippingPoint.name} ausgelöst: #${i + 1} ${nextTp.name} (${finalTemperatureWithoutThis.toFixed(2)}°C >= ${threshold.toFixed(2)}°C)`);
        } else {
            // console.log(`  ❌ Auch mit ${triggerTippingPoint.name} nicht ausgelöst: #${i + 1} ${nextTp.name} (${finalTemperature.toFixed(2)}°C < ${threshold.toFixed(2)}°C)`);
        }
    }
    
    // Alle Kippunkte werden jetzt vollständig geprüft
    
    return cascadeCount;
}

// Globale Exports
window.ClimateLegend = {
    generateLegend,
    setupResetButton,
    calculateCascadeEffect,
    calculateCascadeCount,
    resetCascadeCache
};