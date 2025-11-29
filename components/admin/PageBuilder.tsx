// components/admin/PageBuilder.tsx
'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/components/ThemeContext';

// Define component types
type ComponentType = 
  | 'heading'
  | 'paragraph' 
  | 'button'
  | 'image'
  | 'section'
  | 'grid'
  | 'carousel'
  | 'cta'
  | 'form'
  | 'video';

interface Component {
  id: string;
  type: ComponentType;
  content: any;
  styles: Record<string, any>;
  props: Record<string, any>;
}

interface Section {
  id: string;
  name: string;
  components: Component[];
}

export const PageBuilder = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'canvas' | 'components' | 'styles'>('components');
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'section-1',
      name: 'Hero Section',
      components: [
        {
          id: 'comp-1',
          type: 'heading',
          content: { text: 'Welcome to Our Website' },
          styles: { textAlign: 'center', fontSize: '2.5rem', color: isDark ? '#f8fafc' : '#1e293b' },
          props: {}
        },
        {
          id: 'comp-2',
          type: 'paragraph',
          content: { text: 'This is a sample paragraph in the hero section.' },
          styles: { textAlign: 'center', fontSize: '1.25rem', color: isDark ? '#cbd5e1' : '#475569' },
          props: {}
        }
      ]
    }
  ]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Available components for the palette
  const componentPalette: { type: ComponentType; label: string; icon: string }[] = [
    { type: 'heading', label: 'Heading', icon: 'H' },
    { type: 'paragraph', label: 'Paragraph', icon: 'P' },
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'section', label: 'Section', icon: '◧' },
    { type: 'grid', label: 'Grid', icon: '⊞' },
    { type: 'carousel', label: 'Carousel', icon: '🔄' },
    { type: 'cta', label: 'CTA', icon: '📢' },
    { type: 'form', label: 'Form', icon: '📝' },
    { type: 'video', label: 'Video', icon: '▶️' },
  ];

  const handleAddComponent = (type: ComponentType) => {
    if (!selectedSection) return;

    const newComponent: Component = {
      id: `comp-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type, isDark),
      props: getDefaultProps(type)
    };

    const updatedSections = sections.map(section => 
      section.id === selectedSection.id
        ? { ...section, components: [...section.components, newComponent] }
        : section
    );

    setSections(updatedSections);
    setSelectedComponent(newComponent);
  };

  const getDefaultContent = (type: ComponentType) => {
    switch (type) {
      case 'heading':
        return { text: 'New Heading' };
      case 'paragraph':
        return { text: 'This is a new paragraph. You can edit this text to say whatever you want.' };
      case 'button':
        return { text: 'Click Me', link: '#' };
      case 'image':
        return { src: '', alt: 'Description' };
      case 'video':
        return { src: '', title: 'Video Title' };
      default:
        return { text: `New ${type}` };
    }
  };

  const getDefaultStyles = (type: ComponentType, isDark: boolean) => {
    switch (type) {
      case 'heading':
        return { 
          textAlign: 'left', 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: isDark ? '#f8fafc' : '#1e293b',
          marginBottom: '1rem'
        };
      case 'paragraph':
        return { 
          textAlign: 'left', 
          fontSize: '1rem', 
          color: isDark ? '#cbd5e1' : '#475569',
          lineHeight: '1.6'
        };
      case 'button':
        return { 
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: isDark ? '#4f46e5' : '#3b82f6',
          color: 'white',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'medium',
          cursor: 'pointer'
        };
      case 'image':
        return { 
          width: '100%', 
          height: 'auto', 
          borderRadius: '0.5rem',
          display: 'block'
        };
      default:
        return {};
    }
  };

  const getDefaultProps = (type: ComponentType) => {
    switch (type) {
      case 'button':
        return { link: '#', target: '_self' };
      case 'image':
        return { alt: 'Image description', width: '100%', height: 'auto' };
      default:
        return {};
    }
  };

  const handleComponentClick = (component: Component, section: Section) => {
    setSelectedComponent(component);
    setSelectedSection(section);
  };

  const handleStyleChange = (property: string, value: string | number) => {
    if (!selectedComponent || !selectedSection) return;

    const updatedSections = sections.map(section => {
      if (section.id === selectedSection.id) {
        const updatedComponents = section.components.map(comp => {
          if (comp.id === selectedComponent.id) {
            return {
              ...comp,
              styles: { ...comp.styles, [property]: value }
            };
          }
          return comp;
        });
        return { ...section, components: updatedComponents };
      }
      return section;
    });

    setSections(updatedSections);
    setSelectedComponent({
      ...selectedComponent,
      styles: { ...selectedComponent.styles, [property]: value }
    });
  };

  const renderComponent = (component: Component) => {
    const style = { ...component.styles };

    switch (component.type) {
      case 'heading':
        return (
          <h2 
            style={style}
            className={`builder-element p-2 m-1 rounded cursor-pointer border-2 ${
              selectedComponent?.id === component.id 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick(component, sections.find(s => s.components.includes(component))!);
            }}
          >
            {component.content.text}
          </h2>
        );
      case 'paragraph':
        return (
          <p 
            style={style}
            className={`builder-element p-2 m-1 rounded cursor-pointer border-2 ${
              selectedComponent?.id === component.id 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick(component, sections.find(s => s.components.includes(component))!);
            }}
          >
            {component.content.text}
          </p>
        );
      case 'button':
        return (
          <a 
            href={component.content.link}
            style={style}
            className={`builder-element p-2 m-1 rounded cursor-pointer border-2 inline-block ${
              selectedComponent?.id === component.id 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick(component, sections.find(s => s.components.includes(component))!);
            }}
          >
            {component.content.text}
          </a>
        );
      case 'image':
        return (
          <img 
            src={component.content.src || 'https://placehold.co/300x200?text=Image'}
            alt={component.content.alt}
            style={style}
            className={`builder-element p-2 m-1 rounded cursor-pointer border-2 ${
              selectedComponent?.id === component.id 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick(component, sections.find(s => s.components.includes(component))!);
            }}
          />
        );
      default:
        return (
          <div 
            style={style}
            className={`builder-element p-4 m-1 rounded cursor-pointer border-2 ${
              selectedComponent?.id === component.id 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleComponentClick(component, sections.find(s => s.components.includes(component))!);
            }}
          >
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      {/* Component Palette */}
      <div className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto ${activeTab === 'components' ? 'block' : 'hidden md:block'}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Components</h3>
        <div className="space-y-2">
          {componentPalette.map((comp) => (
            <div
              key={comp.type}
              className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={() => {
                if (sections.length > 0) {
                  handleAddComponent(comp.type);
                }
              }}
            >
              <span className="text-lg mr-3">{comp.icon}</span>
              <span className="text-gray-900 dark:text-white">{comp.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex">
          <button 
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'canvas' 
                ? 'bg-white dark:bg-gray-800 text-indigo-500 border-t border-l border-r border-gray-200 dark:border-gray-700' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('canvas')}
          >
            Canvas
          </button>
          <button 
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'components' 
                ? 'bg-white dark:bg-gray-800 text-indigo-500 border-t border-l border-r border-gray-200 dark:border-gray-700' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('components')}
          >
            Components
          </button>
          <button 
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'styles' 
                ? 'bg-white dark:bg-gray-800 text-indigo-500 border-t border-l border-r border-gray-200 dark:border-gray-700' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('styles')}
          >
            Styles
          </button>
        </div>

        <div 
          ref={canvasRef} 
          className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900"
          onClick={() => {
            setSelectedComponent(null);
            setSelectedSection(null);
          }}
        >
          {sections.map((section) => (
            <div 
              key={section.id} 
              className={`mb-8 p-6 rounded-xl bg-white dark:bg-gray-800 shadow ${
                selectedSection?.id === section.id 
                  ? 'ring-2 ring-indigo-500' 
                  : 'hover:shadow-md transition-shadow'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{section.name}</h3>
              <div className="space-y-4">
                {section.components.map((component) => renderComponent(component))}
              </div>
            </div>
          ))}
          
          <div className="text-center py-8">
            <button 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => {
                setSections([
                  ...sections,
                  {
                    id: `section-${Date.now()}`,
                    name: `Section ${sections.length + 1}`,
                    components: []
                  }
                ]);
              }}
            >
              Add New Section
            </button>
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className={`w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto ${activeTab === 'styles' ? 'block' : 'hidden md:block'}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Properties</h3>
        
        {selectedComponent ? (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white capitalize">
              {selectedComponent.type} Properties
            </h4>
            
            <div className="space-y-3">
              {/* Common styles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
                <input
                  type="text"
                  value={selectedComponent.styles.width || ''}
                  onChange={(e) => handleStyleChange('width', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 100%, 300px"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
                <input
                  type="text"
                  value={selectedComponent.styles.height || ''}
                  onChange={(e) => handleStyleChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., auto, 200px"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Margin</label>
                <input
                  type="text"
                  value={selectedComponent.styles.margin || ''}
                  onChange={(e) => handleStyleChange('margin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 10px, 1rem"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Padding</label>
                <input
                  type="text"
                  value={selectedComponent.styles.padding || ''}
                  onChange={(e) => handleStyleChange('padding', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 10px, 1rem"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Align</label>
                <select
                  value={selectedComponent.styles.textAlign || 'left'}
                  onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
              
              {selectedComponent.type === 'heading' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
                    <input
                      type="text"
                      value={selectedComponent.styles.fontSize || ''}
                      onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., 2rem, 24px"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Weight</label>
                    <select
                      value={selectedComponent.styles.fontWeight || 'normal'}
                      onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                      <option value="700">700</option>
                      <option value="800">800</option>
                      <option value="900">900</option>
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                <input
                  type="color"
                  value={selectedComponent.styles.color || (isDark ? '#f8fafc' : '#1e293b')}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background Color</label>
                <input
                  type="color"
                  value={selectedComponent.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Select a component to edit its properties</p>
        )}
      </div>
    </div>
  );
};