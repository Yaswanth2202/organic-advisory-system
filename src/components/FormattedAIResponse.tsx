interface FormattedAIResponseProps {
  content: string;
}

const FormattedAIResponse = ({ content }: FormattedAIResponseProps) => {
  // Parse the AI response into sections
  const parseResponse = (text: string) => {
    const sections: { icon: string; title: string; content: string }[] = [];
    
    // Split by emoji markers
    const parts = text.split(/(?=🌱|📊|🐛|💊|🛡️)/);
    
    parts.forEach(part => {
      if (!part.trim()) return;
      
      const lines = part.trim().split('\n');
      const firstLine = lines[0];
      
      let icon = '';
      let title = '';
      let content = lines.slice(1).join('\n').trim();
      
      if (firstLine.includes('🌱')) {
        icon = '🌱';
        title = 'Crop Identified';
        content = firstLine.replace('🌱 CROP:', '').trim() + (content ? '\n' + content : '');
      } else if (firstLine.includes('📊')) {
        icon = '📊';
        title = 'Health Status';
        content = firstLine.replace('📊 STATUS:', '').trim() + (content ? '\n' + content : '');
      } else if (firstLine.includes('🐛')) {
        icon = '🐛';
        title = 'Issue Detected';
        content = firstLine.replace('🐛 PROBLEM:', '').trim() + (content ? '\n' + content : '');
      } else if (firstLine.includes('💊')) {
        icon = '💊';
        title = 'Treatment';
        content = firstLine.replace('💊 SOLUTION:', '').trim() + (content ? '\n' + content : '');
      } else if (firstLine.includes('🛡️')) {
        icon = '🛡️';
        title = 'Prevention';
        content = firstLine.replace('🛡️ PREVENTION:', '').trim() + (content ? '\n' + content : '');
      } else {
        // Fallback for unstructured content
        sections.push({ icon: '📝', title: 'Information', content: part.trim() });
        return;
      }
      
      if (content) {
        sections.push({ icon, title, content });
      }
    });
    
    return sections.length > 0 ? sections : [{ icon: '📝', title: 'Analysis', content: text }];
  };
  
  const sections = parseResponse(content);
  
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div 
          key={index}
          className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{section.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
              <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {section.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormattedAIResponse;
