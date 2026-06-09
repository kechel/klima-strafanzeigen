/**
 * Chart-Management - Erstellt und verwaltet das Klima-Chart mit Kippunkten
 */

// Chart-Plugin für Kippunkt-Rechtecke und Interaktivität
const tippingPointsPlugin = {
    id: 'tippingPointsPlugin',
    beforeDatasetsDraw(chart) {
        const simulationResults = window.cachedSimulationResults;
        if (!simulationResults) return;

        const baseTippingPoints = window.baseTippingPoints || [];
        if (baseTippingPoints.length === 0) return;

        const { ctx, scales } = chart;
        
        // Sortiere Kippunkte nach Temperaturschwelle (wie in der Legende)
        const sortedBaseTippingPoints = [...baseTippingPoints].sort((a, b) => a.temp20 - b.temp20);
        
        // Hole aktuelle Wahrscheinlichkeitsschwelle aus aktivem Button
        const activeButton = document.querySelector('.prob-btn.active');
        const currentProbability = activeButton ? parseInt(activeButton.getAttribute('data-prob')) : 20;
        
        // Erstelle erweiterte Kippunkt-Daten mit Aktivierungsinfo
        const allTippingPoints = sortedBaseTippingPoints.map((tp, index) => {
            const enhanced = { ...tp };
            
            // Berechne dynamische Temperaturschwelle basierend auf aktueller Wahrscheinlichkeit
            // Erweiterte Interpolation für 0% bis 100%
            const temp20 = tp.temp20;
            const temp80 = tp.temp80 || (tp.temp20 + 0.5);
            
            // Begrenzte Interpolation nur zwischen 20%-80% (wissenschaftlich belegte Range)
            const dynamicThreshold = temp20 + (temp80 - temp20) * (currentProbability - 20) / 60;
            
            enhanced.dynamicTempThreshold = dynamicThreshold;
            
            // Finde wann dieser Kippunkt in der Simulation aktiviert wurde
            let activationYear = null;
            if (simulationResults) {
                activationYear = simulationResults.years.find((year, yearIndex) => {
                    return simulationResults.activeTippingPoints[yearIndex] && simulationResults.activeTippingPoints[yearIndex].includes(tp.name);
                });
                
                if (activationYear) {
                    enhanced.dynamicYearStart = activationYear;
                    // Verwende die berechnete Schwelle anstatt der tatsächlichen Temperatur zum Aktivierungszeitpunkt
                    enhanced.activationTempThreshold = enhanced.dynamicTempThreshold;
                }
            }
            
            return enhanced;
        });

        // Speichere für Hover-Detection
        chart.tippingPoints = allTippingPoints;

        // Hilfsfunktion für Rechteck-Zeichnung
        const drawTippingPointRectangle = (tp, isHighlighted = false) => {
            // X-Positionen basierend auf Jahren (X-Achse Mapping)
            const chartYears = [2000, 2010, 2020, 2024, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100, 2120, 2150, 2200, 2250, 2300];
            
            function findXForYear(targetYear) {
                for (let i = 0; i < chartYears.length - 1; i++) {
                    const year1 = chartYears[i];
                    const year2 = chartYears[i + 1];
                    
                    if (targetYear >= year1 && targetYear <= year2) {
                        // Lineare Interpolation
                        const ratio = (targetYear - year1) / (year2 - year1);
                        const x1 = scales.x.getPixelForValue(i);
                        const x2 = scales.x.getPixelForValue(i + 1);
                        return x1 + ratio * (x2 - x1);
                    }
                }
                // Falls außerhalb des Bereichs
                if (targetYear < chartYears[0]) return scales.x.getPixelForValue(0);
                return scales.x.getPixelForValue(chartYears.length - 1);
            }
            
            // Berechne Start- und End-Jahr aus Simulation
            let actualStartYear = null;
            let actualEndYear = null;
            
            if (simulationResults) {
                // Finde wann dieser Kippunkt aktiviert wurde
                for (let year of simulationResults.years) {
                    const yearIndex = simulationResults.years.indexOf(year);
                    const activeTippingPoints = simulationResults.activeTippingPoints[yearIndex];
                    
                    if (activeTippingPoints && activeTippingPoints.includes(tp.name)) {
                        actualStartYear = year;
                        
                        // Berechne End-Jahr basierend auf total_co2_gt und Rate
                        const totalGtC = tp.total_co2_gt || 100;
                        const rateGtCPerYear = tp.co2_rate_ppm_year * 2.13;
                        const durationYears = Math.round(totalGtC / rateGtCPerYear);
                        actualEndYear = actualStartYear + durationYears;
                        break;
                    }
                }
            }
            
            // Falls nicht in Simulation gefunden, überspringe
            if (!actualStartYear) return;
            
            const xStart = findXForYear(actualStartYear);
            const xEnd = findXForYear(actualEndYear);
            
            // Y-Position: Verwende Temperaturachse (rechte Y-Achse)
            const yTemperatureAxis = scales.y1;
            
            // Verwende die spezifische Temperaturschwelle dieses Kippunkts
            const tempStart = tp.dynamicTempThreshold || tp.temp20; // Verwende dynamische Schwelle
            
            // Rechteck-Höhe basierend auf jährlicher CO2-Rate (proportional)
            const minHeightPx = 20;   // Mindesthöhe
            const maxHeightPx = 80;   // Maximale Höhe
            const maxCO2Rate = 10;    // Geschätzte maximale CO2-Rate für Skalierung
            
            // Berechne proportionale Höhe basierend auf CO2-Rate
            const co2Rate = tp.co2_rate_ppm_year || 1;
            const heightRatio = Math.min(co2Rate / maxCO2Rate, 1); // Begrenze auf maximal 1
            const rectHeightPx = minHeightPx + (heightRatio * (maxHeightPx - minHeightPx));
            
            
            const yStart = yTemperatureAxis.getPixelForValue(tempStart); // Spezifische Temperaturschwelle
            
 
            
            // OBERE KANTE des Rechtecks soll die Aktivierungstemperatur (1.8°C) berühren
            // Rechteck erstreckt sich nach unten (größere Y-Werte)
            const actualYTop = yStart; // Obere Kante bei Aktivierungstemperatur
            const actualYBottom = yStart + rectHeightPx; // Untere Kante 50px weiter unten
            
            const rectWidth = xEnd - xStart;
            const rectHeight = actualYBottom - actualYTop;
            
            // Speichere Bounds für Hover-Detection - CHART-Koordinaten (für getRelativePosition)
            tp.chartBounds = {
                left: xStart,        // scales.x.getPixelForValue() gibt Chart-Koordinaten (für getRelativePosition)
                right: xEnd,         // scales.x.getPixelForValue() gibt Chart-Koordinaten
                top: actualYTop,     // scales.y1.getPixelForValue() gibt Chart-Koordinaten
                bottom: actualYBottom // scales.y1.getPixelForValue() gibt Chart-Koordinaten
            };
            
            // Rechteck zeichnen
            if (isHighlighted) {
                // Weißer Hintergrund + schwarzer 1px Rahmen
                ctx.fillStyle = '#ffffff'; // Weißer Hintergrund
                ctx.fillRect(xStart, actualYTop, rectWidth, rectHeight);
                
                // Schwarzer 1px Rahmen
                ctx.strokeStyle = '#000000'; // Schwarz
                ctx.lineWidth = 1; // Dünner Rahmen
                ctx.strokeRect(xStart, actualYTop, rectWidth, rectHeight);
                
                // TEXT IN RECHTECK HINZUFÜGEN - Horizontal fließend
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Erstelle einen zusammenhängenden Text
                const yearText = actualStartYear ? `${actualStartYear}` : 'nicht erreicht';
                const displayTemp = tp.dynamicTempThreshold || tp.temp20;
                const fullText = `${tp.name} • ${displayTemp.toFixed(1)}°C • ${yearText}`;
                
                // Text in der Mitte des Rechtecks
                const textX = xStart + rectWidth / 2;
                const textY = actualYTop + rectHeight / 2;
                
                // Text mit weißem Schatten für bessere Lesbarkeit
                ctx.fillStyle = '#ffffff';
                ctx.fillText(fullText, textX + 1, textY + 1);
                ctx.fillStyle = '#000000';
                ctx.fillText(fullText, textX, textY);
                
            } else {
                // Normaler Rechteck mit original Farbe
                ctx.fillStyle = tp.color;
                ctx.fillRect(xStart, actualYTop, rectWidth, rectHeight);
                
                // Spezieller Rahmen basierend auf Simulationsergebnissen
                if (tp.dynamicYearStart) {
                    const yearDifference = tp.year_start - tp.dynamicYearStart;
                    
                    if (Math.abs(yearDifference) > 2) {
                        // Gestrichelter Rahmen für signifikant veränderte Kippunkte
                        ctx.setLineDash([4, 2]);
                        ctx.strokeStyle = yearDifference > 0 ? '#ff6b35' : '#9c27b0'; // Orange früher, Lila später
                        ctx.lineWidth = 2;
                        ctx.strokeRect(xStart, actualYTop, rectWidth, rectHeight);
                        ctx.setLineDash([]); // Reset
                    } else {
                        // Grüner Rahmen für korrekt vorhergesagte Kippunkte
                        ctx.strokeStyle = '#4caf50';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(xStart, actualYTop, rectWidth, rectHeight);
                    }
                } else {
                    // Normaler Rahmen für nicht aktivierte Kippunkte
                    ctx.strokeStyle = tp.color.replace('0.3', '0.8');
                    ctx.lineWidth = 1;
                    ctx.strokeRect(xStart, actualYTop, rectWidth, rectHeight);
                }
            }
        };

        // Zeichne zuerst alle normalen Rechtecke, dann das hervorgehobene im Vordergrund
        const currentHighlight = chart.highlightedTippingPoint;
        const normalTippingPoints = allTippingPoints.filter(tp => tp.name !== currentHighlight);
        const highlightedTippingPoint = allTippingPoints.find(tp => tp.name === currentHighlight);

        // 1. Zeichne alle normalen Rechtecke
        normalTippingPoints.forEach(tp => {
            drawTippingPointRectangle(tp, false);
        });

        // 2. Zeichne hervorgehobenes Rechteck im Vordergrund (falls vorhanden)
        if (highlightedTippingPoint) {
            drawTippingPointRectangle(highlightedTippingPoint, true);
        }
    },

    beforeEvent(chart, args) {
        const event = args.event;
        
        // Nur bei Klicks
        if (event.type !== 'click') {
            return;
        }
        
        // Verwende event.native für präzise Browser-Event-Koordinaten
        if (!event.native) {
            return;
        }
        
        // Verwende Chart.js offizielle API für Koordinaten-Transformation (wie in Doku)
        const chartPosition = Chart.helpers.getRelativePosition(event.native, chart);
        const chartClickX = chartPosition.x;
        const chartClickY = chartPosition.y;
        
        // Prüfe Rechteck-Kollisionen
        if (chart.tippingPoints) {
            let foundMatch = false;
            
            chart.tippingPoints.forEach((tp, index) => {
                if (tp.chartBounds) {
                    // Vergleiche CHART-Koordinaten mit CHART-Koordinaten (beide via getRelativePosition) 
                    const isInXRange = chartClickX >= tp.chartBounds.left && chartClickX <= tp.chartBounds.right;
                    const isInYRange = chartClickY >= tp.chartBounds.top && chartClickY <= tp.chartBounds.bottom;
                    
                    
                    if (isInXRange && isInYRange) {
                        foundMatch = true;
                        
                        // TOGGLE-FUNKTIONALITÄT: Wenn bereits aktiv, deaktiviere es
                        const isCurrentlyActive = chart.highlightedTippingPoint === tp.name;
                        
                        if (isCurrentlyActive) {
                            // Deaktiviere Highlighting
                            window.ClimateChart.highlightTippingPoint(chart, null);
                            
                            // Entferne Legende-Highlights
                            document.querySelectorAll('.legend-item').forEach(item => {
                                item.style.backgroundColor = '';
                                item.style.boxShadow = '';
                                item.style.transform = '';
                                item.classList.remove('legend-item-active');
                            });
                            
                            // Verstecke Info-Box
                            hideTippingPointInfo();
                        } else {
                            // Aktiviere neuen Kippunkt
                            window.ClimateChart.highlightTippingPoint(chart, tp.name);
                            
                            // Finde und synchronisiere Pfeiltasten-Index
                            const tippingPointIndex = chart.tippingPoints.findIndex(point => point.name === tp.name);
                            if (window.setCurrentTippingPointIndex && tippingPointIndex !== -1) {
                                window.setCurrentTippingPointIndex(tippingPointIndex);
                            }
                            
                            // Synchronisiere Legende
                            document.querySelectorAll('.legend-item').forEach(item => {
                                item.style.backgroundColor = '';
                                item.style.boxShadow = '';
                                item.style.transform = '';
                                item.classList.remove('legend-item-active');
                            });
                            
                            const legendItems = document.querySelectorAll('.legend-item');
                            legendItems.forEach(legendItem => {
                                if (legendItem.dataset.tippingPointName === tp.name) {
                                    legendItem.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
                                    legendItem.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
                                    legendItem.style.transform = 'scale(1.02)';
                                    legendItem.classList.add('legend-item-active');
                                }
                            });
                            
                            // Zeige Info-Box (verwende bereits deklarierte Variable)
                            showTippingPointInfo(tp, tippingPointIndex + 1, chart.tippingPoints.length);
                        }
                        
                        return;
                    }
                }
            });
            
            if (!foundMatch) {
                window.ClimateChart.highlightTippingPoint(chart, null);
                
                document.querySelectorAll('.legend-item').forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.boxShadow = '';
                    item.style.transform = '';
                    item.classList.remove('legend-item-active');
                });
                
                // Verstecke Info-Box
                hideTippingPointInfo();
            }
        }
    }
};

// Chart-Erstellung
function createChart(chartData) {
    
    // Chart Canvas
    const co2TempCtx = document.getElementById('co2TempChart').getContext('2d');
    
    // Plugin registrieren
    Chart.register(tippingPointsPlugin);
    
    // Erstelle Chart mit echten Simulationsdaten
    const co2TempChart = new Chart(co2TempCtx, {
        type: 'line',
        data: {
            labels: ['2000', '2010', '2020', '2024', '2030', '2040', '2050', '2060', '2070', '2080', '2090', '2100', '2120', '2150', '2200', '2250', '2300'],
            datasets: [{
                label: 'CO2 mit Kippunkt-Effekten (ppm)',
                data: chartData.co2DataWithTipping,
                borderColor: '#8e44ad',
                backgroundColor: 'rgba(142, 68, 173, 0.1)',
                tension: 0.4,
                yAxisID: 'y',
                borderWidth: 4
            }, {
                label: 'CO2 ohne Kippunkt-Effekte (ppm)',
                data: [370, 390, 410, 425, 450, 485, 530, 580, 620, 680, 760, 850, 950, 1050, 1150, 1250, 1350],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                yAxisID: 'y',
                borderWidth: 2,
                borderDash: [4, 4]
            }, {
                label: 'Temperaturentwicklung (°C)',
                data: chartData.tempData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                yAxisID: 'y1',
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            // Aktiviere Events explizit, aber deaktiviere Standard-onClick
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            interaction: {
                intersect: false,
                mode: 'point'
            },
            layout: {
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            },
            plugins: {
                tippingPointsPlugin: {},
                title: {
                    display: true,
                    text: 'CO2 und Temperaturentwicklung mit Kippunkten',
                    font: { size: 14 }
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { 
                        font: { size: 15 },
                        usePointStyle: true,
                        pointStyle: 'line'
                    },
                    onClick: function() {
                        // Deaktiviere Legende-Klicks komplett
                        return false;
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'CO2 (ppm)' },
                    min: 400,
                    max: 6500  // Erhöht für Simulationsdaten
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Temperatur (°C)' },
                    min: 0.5,
                    max: 15.0,  // Erhöht für Simulationsdaten
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
    
    // Verwende Chart.js-eigene Event-Transformation für präzise Koordinaten
    co2TempCtx.canvas.addEventListener('click', function(e) {
        // Verwende Chart.js Helpers für korrekte Koordinaten-Transformation
        const canvasPosition = Chart.helpers.getRelativePosition(e, co2TempChart);
        
        // Verwende die rohen Chart.js-Koordinaten OHNE hartcodierten Offset
        const x = canvasPosition.x;  
        const y = canvasPosition.y;
        
        if (co2TempChart.tippingPoints) {
            let foundHit = false;
            co2TempChart.tippingPoints.forEach((tp, index) => {
                if (tp.chartBounds && !foundHit) {
                    const inBounds = x >= tp.chartBounds.left && x <= tp.chartBounds.right &&
                                    y >= tp.chartBounds.top && y <= tp.chartBounds.bottom;
                    
                    
                    if (inBounds) {
                        foundHit = true;
                        
                        // TOGGLE-FUNKTIONALITÄT: Wenn bereits aktiv, deaktiviere es
                        const isCurrentlyActive = co2TempChart.highlightedTippingPoint === tp.name;
                        
                        if (isCurrentlyActive) {
                            // Deaktiviere Highlighting
                            window.ClimateChart.clearHighlight(co2TempChart);
                            
                            // Entferne Legende-Highlights
                            document.querySelectorAll('.legend-item').forEach(item => {
                                item.style.backgroundColor = '';
                                item.style.boxShadow = '';
                                item.style.transform = '';
                                item.classList.remove('legend-item-active');
                            });
                        } else {
                            // Aktiviere neues Highlighting
                            window.ClimateChart.highlightTippingPoint(co2TempChart, tp.name);
                            
                            // Synchronisiere Pfeiltasten-Index
                            currentTippingPointIndex = index;
                            
                            // Synchronisiere Legende
                            document.querySelectorAll('.legend-item').forEach(item => {
                                item.style.backgroundColor = '';
                                item.style.boxShadow = '';
                                item.style.transform = '';
                                item.classList.remove('legend-item-active');
                            });
                            
                            const legendItems = document.querySelectorAll('.legend-item');
                            legendItems.forEach(legendItem => {
                                if (legendItem.dataset.tippingPointName === tp.name) {
                                    legendItem.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
                                    legendItem.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
                                    legendItem.style.transform = 'scale(1.02)';
                                    legendItem.classList.add('legend-item-active');
                                }
                            });
                        }
                    }
                }
            });
            
            if (!foundHit) {
                window.ClimateChart.clearHighlight(co2TempChart);
                document.querySelectorAll('.legend-item').forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.boxShadow = '';
                    item.style.transform = '';
                    item.classList.remove('legend-item-active');
                });
            }
        }
    });
    
    // Pfeiltasten-Navigation für Kippunkte
    let currentTippingPointIndex = -1; // -1 = kein Element aktiv
    
    // Funktion um den Index von außen zu setzen (für Legende-Klicks)
    window.setCurrentTippingPointIndex = function(index) {
        currentTippingPointIndex = index;
        console.log(`🔄 Pfeiltasten-Index gesetzt auf: ${index}`);
    };
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault(); // Verhindere Seiten-Scrolling
            
            const tippingPoints = co2TempChart.tippingPoints || [];
            if (tippingPoints.length === 0) return;
            
            if (e.key === 'ArrowRight') {
                // Vorwärts durch die Kippunkte
                currentTippingPointIndex = (currentTippingPointIndex + 1) % tippingPoints.length;
            } else if (e.key === 'ArrowLeft') {
                // Rückwärts durch die Kippunkte
                currentTippingPointIndex = currentTippingPointIndex <= 0 ? 
                    tippingPoints.length - 1 : currentTippingPointIndex - 1;
            }
            
            const selectedTippingPoint = tippingPoints[currentTippingPointIndex];
            
            // Aktiviere das gewählte Element
            window.ClimateChart.highlightTippingPoint(co2TempChart, selectedTippingPoint.name);
            
            // Synchronisiere Legende-Hervorhebung
            document.querySelectorAll('.legend-item').forEach(item => {
                item.style.backgroundColor = '';
                item.style.boxShadow = '';
                item.style.transform = '';
                item.classList.remove('legend-item-active');
            });
            
            const legendItems = document.querySelectorAll('.legend-item');
            legendItems.forEach(legendItem => {
                if (legendItem.dataset.tippingPointName === selectedTippingPoint.name) {
                    legendItem.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
                    legendItem.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
                    legendItem.style.transform = 'scale(1.02)';
                    legendItem.classList.add('legend-item-active');
                }
            });
            
            // Zeige Info-Box direkt unter dem Canvas
            showTippingPointInfo(selectedTippingPoint, currentTippingPointIndex + 1, tippingPoints.length);
        } else if (e.key === 'Escape') {
            // ESC deaktiviert das aktuelle Element
            currentTippingPointIndex = -1;
            
            window.ClimateChart.clearHighlight(co2TempChart);
            document.querySelectorAll('.legend-item').forEach(item => {
                item.style.backgroundColor = '';
                item.style.boxShadow = '';
                item.style.transform = '';
                item.classList.remove('legend-item-active');
            });
            
            // Verstecke Info-Box
            hideTippingPointInfo();
        }
    });
    
    return co2TempChart;
}

// Info-Box-Funktionen für Pfeiltasten-Navigation
function showTippingPointInfo(tippingPoint, currentIndex, totalCount) {
    // Hole aktuelle Wahrscheinlichkeitsschwelle aus aktivem Button
    const activeButton = document.querySelector('.prob-btn.active');
    const currentProbability = activeButton ? parseInt(activeButton.getAttribute('data-prob')) : 20;
    // Erstelle oder finde Info-Box
    let infoBox = document.getElementById('tipping-point-info-box');
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'tipping-point-info-box';
        infoBox.className = 'tipping-point-info-box';
        
        // Füge nach dem Chart-Container ein
        const chartContainer = document.querySelector('.chart-container');
        chartContainer.parentNode.insertBefore(infoBox, chartContainer.nextSibling);
    }
    
    // Finde Erklärung aus Daten
    const explanation = tippingPoint.explanation || 'Wissenschaftliche Erklärung wird recherchiert...';
    
    // Berechne Simulationswerte
    let activationInfo = 'Nicht erreicht bis 2300';
    const simulationResults = window.cachedSimulationResults;
    if (simulationResults && tippingPoint.dynamicYearStart) {
        const totalGtC = tippingPoint.total_co2_gt || 100;
        const rateGtCPerYear = tippingPoint.co2_rate_ppm_year * 2.13;
        const durationYears = Math.round(totalGtC / rateGtCPerYear);
        const endYear = tippingPoint.dynamicYearStart + durationYears;
        activationInfo = `${tippingPoint.dynamicYearStart}-${endYear} (${durationYears} Jahre)`;
    }
    
    infoBox.innerHTML = `
        <div class="info-header">
            <h3>${tippingPoint.name}</h3>
            <div class="info-counter">${currentIndex} / ${totalCount}</div>
        </div>
        <div class="info-content">
            <div class="info-left">
                <div class="info-row">
                    <strong>Temperaturschwelle:</strong> ${(tippingPoint.dynamicTempThreshold || tippingPoint.temp20).toFixed(1)}°C (${currentProbability}% Wahrscheinlichkeit)
                </div>
                <div class="info-row">
                    <strong>CO2-Rate:</strong> ${tippingPoint.co2_rate_ppm_year} ppm/Jahr
                </div>
                <div class="info-row">
                    <strong>Aktivierung in Simulation:</strong> ${activationInfo}
                </div>
                ${tippingPoint.verified_threshold ? `<div class="info-row">
                    <strong>Verifizierte Schwelle:</strong> ${tippingPoint.verified_threshold}
                </div>` : ''}
                ${tippingPoint.verified_impact ? `<div class="info-row">
                    <strong>Beobachtete Auswirkungen:</strong> ${tippingPoint.verified_impact}
                </div>` : ''}
            </div>
            <div class="info-right">
                <div class="info-explanation">${explanation}</div>
                ${tippingPoint.sources && tippingPoint.sources.length > 0 ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ecf0f1;">
                    <strong style="color: #2c3e50; font-size: 0.9rem;">📚 Wissenschaftliche Quellen:</strong>
                    <ul style="margin: 8px 0; padding-left: 20px; font-size: 0.85rem;">
                        ${tippingPoint.sources.map(source => `
                            <li style="margin-bottom: 5px;">
                                <a href="${source.url}" target="_blank" style="color: #3498db; text-decoration: none;">
                                    ${source.title}
                                </a>
                                ${source.journal ? ` - <em>${source.journal}</em>` : ''} (${source.year})
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        </div>
        <div class="info-controls">Pfeiltasten ← → zum Navigieren, ESC zum Schließen</div>
    `;
    
    infoBox.style.display = 'block';
}

function hideTippingPointInfo() {
    const infoBox = document.getElementById('tipping-point-info-box');
    if (infoBox) {
        infoBox.style.display = 'none';
    }
}

// Highlight-Funktionen
function highlightTippingPoint(chart, tippingPointName) {
    chart.highlightedTippingPoint = tippingPointName;
    chart.update('none');
}

function clearHighlight(chart) {
    chart.highlightedTippingPoint = null;
    chart.update('none');
}

// Setter-Funktion für Pfeiltasten-Index
function setCurrentTippingPointIndex(index) {
    // Diese Funktion wird in createChart() lokal definiert, daher brauchen wir einen Wrapper
    if (window.setCurrentTippingPointIndex) {
        window.setCurrentTippingPointIndex(index);
    }
}

// Globale Exports
window.ClimateChart = {
    createChart,
    highlightTippingPoint,
    clearHighlight,
    setCurrentTippingPointIndex,
    tippingPointsPlugin
};

// Mache showTippingPointInfo und hideTippingPointInfo global verfügbar
window.showTippingPointInfo = showTippingPointInfo;
window.hideTippingPointInfo = hideTippingPointInfo;