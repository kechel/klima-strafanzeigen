#!/usr/bin/env node

// Ein einziges Build-Script für Carbon-Removal-Strafanzeige

const fs = require('fs-extra');
const { TextDocument, Heading, Paragraph } = require('simple-odf');

console.log('🔨 Carbon-Removal-Strafanzeige Builder');
console.log('======================================');

async function buildCarbonRemovalStrafanzeige() {
    console.log('📝 Erstelle Carbon-Removal-Strafanzeige...');
    
    // Erstelle neues TextDocument
    const document = new TextDocument();
    const body = document.getBody();
    
    const files = [
        'strafanzeige-carbon-removal-gesamtschuld.md',
        'anhang-carbon-removal-kosten.md'
    ];
    
    // Verarbeite Haupt-Strafanzeige + Carbon-Removal-Anhang
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (fs.existsSync(file)) {
            console.log(`   ✅ ${file}`);
            
            let content = await fs.readFile(file, 'utf8');
            
            // Entferne BUILD_SKIP Kommentare  
            content = content.replace(/^<!-- BUILD_SKIP:.*$/gm, '');
            content = content.replace(/^<!-- ANHAENGE:.*$/gm, '');
            content = content.replace(/^\\pagebreak$/gm, '');
            
            // Parse Markdown → simple-odf
            parseMarkdownToODF(content, body);
            
            // Seitenumbruch zwischen Hauptanzeige und Anhang
            if (i === 0) {
                const pageBreak = new Paragraph();
                body.append(pageBreak);
                console.log(`   📃 Seitenumbruch vor Anhang`);
            }
            
        } else {
            console.log(`   ⚠️  Datei fehlt: ${file}`);
        }
    }
    
    // Speichere mit thematischem Namen
    const outputFile = 'strafanzeige-carbon-removal-gesamtschuld.odt';
    console.log(`📦 Speichere ${outputFile}...`);
    document.saveFlat(outputFile);
    
    console.log(`✅ ${outputFile} erstellt`);
    console.log('');
    console.log('🎯 Diese ODT enthält:');
    console.log('   ✅ Carbon-Removal-Strafanzeige mit allen Gesetzesverstößen');
    console.log('   ✅ Fokus: 443.000-1.175.000€ Schulden pro deutschem Kind (seit 9.8.2021)');
    console.log('   ✅ Jahr-für-Jahr Prognose bis 2030');
    console.log('   ✅ Alle Tatbestände aus Carbon-Removal-Schädigung abgeleitet');
    console.log('');
    console.log('🚀 Zentrale Argumentation: Jede Tonne CO₂ = 490-1.000€ Schulden für unsere Kinder');
}

// Markdown → simple-odf Parser
function parseMarkdownToODF(content, body) {
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Überschriften
        if (trimmedLine.match(/^# (.+)$/)) {
            const text = trimmedLine.replace(/^# /, '').replace(/\*\*/g, '');
            const heading = new Heading(text, 1);
            body.append(heading);
            
        } else if (trimmedLine.match(/^## (.+)$/)) {
            const text = trimmedLine.replace(/^## /, '').replace(/\*\*/g, '');
            const heading = new Heading(text, 2);
            body.append(heading);
            
        } else if (trimmedLine.match(/^### (.+)$/)) {
            const text = trimmedLine.replace(/^### /, '').replace(/\*\*/g, '');
            const heading = new Heading(text, 3);
            body.append(heading);
            
        } else if (trimmedLine.match(/^#### (.+)$/)) {
            const text = trimmedLine.replace(/^#### /, '').replace(/\*\*/g, '');
            const heading = new Heading(text, 4);
            body.append(heading);
            
        // Bullet Points
        } else if (trimmedLine.match(/^[*-] (.+)$/)) {
            const text = trimmedLine.replace(/^[*-] /, '').replace(/\*\*(.+?)\*\*/g, '$1');
            const paragraph = new Paragraph();
            paragraph.addText(`• ${text}`);
            body.append(paragraph);
            
        // Tabellen - als formatierter Text
        } else if (trimmedLine.match(/^\|.+\|$/)) {
            const cells = trimmedLine.split('|').slice(1, -1).map(cell => cell.trim().replace(/\*\*/g, ''));
            
            if (!cells[0].match(/^:?-+:?$/)) {
                const tableText = cells.join(' | ');
                const paragraph = new Paragraph();
                paragraph.addText(tableText);
                body.append(paragraph);
            }
            
        // Normaler Text
        } else if (trimmedLine.length > 0 && !trimmedLine.startsWith('<!--')) {
            const text = trimmedLine.replace(/\*\*(.+?)\*\*/g, '$1');
            const paragraph = new Paragraph();
            paragraph.addText(text);
            body.append(paragraph);
        }
    }
}

// Starte Build
buildCarbonRemovalStrafanzeige().catch(console.error);