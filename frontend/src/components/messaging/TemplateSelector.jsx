import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

const TemplateSelector = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 1,
      name: 'Welcome Message',
      category: 'Marketing',
      content: 'Hi {{name}}, welcome to {{company}}! 🎉',
      variables: ['name', 'company']
    },
    {
      id: 2,
      name: 'Order Confirmation',
      category: 'Transactional',
      content: 'Hello {{name}}, your order #{{order_id}} has been confirmed!',
      variables: ['name', 'order_id']
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelectTemplate(template)}
          className="p-4 bg-[#0f0f0f] rounded-lg border border-white/10 hover:border-green-500/50 transition-all text-left"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-semibold">{template.name}</h4>
            <Sparkles className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-white/60 text-sm">{template.content}</p>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
