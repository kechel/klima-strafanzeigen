/**
 * Helper-Funktionen - Utilities und DOM-Manipulation
 */

// Utility-Funktionen
function formatNumber(num, decimals = 1) {
    return num.toFixed(decimals);
}

function formatYear(year) {
    return year.toString();
}

function getStatusColor(temp20) {
    if (temp20 <= 1.5) return '#e74c3c'; // Rot - bereits eingetreten
    if (temp20 <= 2.0) return '#f39c12'; // Orange - bald erwartet
    if (temp20 <= 3.0) return '#3498db'; // Blau - bei höherer Erwärmung
    return '#9b59b6'; // Lila - bei extremer Erwärmung
}

// Initialisierung beim Laden der Seite
function initializeHelpers() {
    // Helper-Funktionen sind bereit
}

// Globale Exports
window.ClimateHelpers = {
    formatNumber,
    formatYear,
    getStatusColor,
    initializeHelpers
};