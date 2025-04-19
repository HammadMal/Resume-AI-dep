const PDFDocument = require('pdfkit');

const generateReport = async (req, res) => {
    try {
        const { analysisResults } = req.body;
        
        // Create a PDF document
        const doc = new PDFDocument();
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume-analysis.pdf');
        
        // Pipe the PDF to the response
        doc.pipe(res);
        
        // Add content to PDF
        doc.fontSize(24)
           .text('Resume Analysis Report', { align: 'center' })
           .moveDown(2);
        
        // ATS Analysis Section
        if (analysisResults.ats_analysis) {
            doc.fontSize(16)
               .text('ATS Analysis', { underline: true })
               .moveDown(0.5);
            
            doc.fontSize(12)
               .text(`Match Score: ${analysisResults.ats_analysis.score}%`)
               .moveDown(0.5);
            
            // Missing Keywords
            if (analysisResults.ats_analysis.missing_keywords?.length > 0) {
                doc.text('Missing Keywords:', { underline: true })
                   .moveDown(0.3);
                analysisResults.ats_analysis.missing_keywords.forEach(keyword => {
                    doc.text(`• ${keyword}`);
                });
            }
            doc.moveDown();
        }
        
        // Grammar Analysis
        if (analysisResults.grammar_analysis) {
            doc.fontSize(16)
               .text('Grammar Analysis', { underline: true })
               .moveDown(0.5);
            
            doc.fontSize(12)
               .text(`Writing Score: ${analysisResults.grammar_analysis.score}%`)
               .moveDown(0.5);
            
            if (analysisResults.grammar_analysis.suggestions?.length > 0) {
                doc.text('Suggestions:', { underline: true })
                   .moveDown(0.3);
                analysisResults.grammar_analysis.suggestions.forEach(suggestion => {
                    doc.text(`• ${suggestion}`);
                });
            }
            doc.moveDown();
        }
        
        // Improvement Suggestions
        if (analysisResults.suggestions) {
            doc.fontSize(16)
               .text('Improvement Suggestions', { underline: true })
               .moveDown(0.5);
            
            doc.fontSize(12);
            
            if (analysisResults.suggestions.content_improvements?.length > 0) {
                doc.text('Content Improvements:', { underline: true })
                   .moveDown(0.3);
                analysisResults.suggestions.content_improvements.forEach(improvement => {
                    doc.text(`• ${improvement}`);
                });
                doc.moveDown();
            }
            
            if (analysisResults.suggestions.skills_to_highlight?.length > 0) {
                doc.text('Skills to Highlight:', { underline: true })
                   .moveDown(0.3);
                analysisResults.suggestions.skills_to_highlight.forEach(skill => {
                    doc.text(`• ${skill}`);
                });
            }
        }
        
        // Finalize PDF
        doc.end();
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Failed to generate PDF report' });
    }
};

module.exports = { generateReport };