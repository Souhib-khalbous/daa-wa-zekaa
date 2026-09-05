import { bilingual as b } from '@/lib/i18n';
import type { Workflow } from '@/lib/workflow';
export const heroWorkflow: Workflow = {
  description: b('تبدأ المهام المتكررة بمسارين: تنظيم البيانات وربط الأدوات، أو معالجة ذكية تجهّز العمل للمراجعة والتسليم.', 'Repetitive tasks follow two connected paths: organize the information and connect the tools, or use AI assistance to prepare work for review and delivery.'),
  nodes: [ { id: 'start', kind: 'trigger', label: b('عمل متكرر', 'Repetitive work') }, { id: 'organize', kind: 'process', label: b('رتّب البيانات', 'Organize the input') }, { id: 'think', kind: 'ai', label: b('معالجة ذكية', 'AI assistance') }, { id: 'connect', kind: 'integration', label: b('أدواتك مترابطة', 'Connected tools') }, { id: 'done', kind: 'result', label: b('جاهز للخطوة التالية', 'Ready for what’s next') } ],
  edges: [{ from: 'start', to: 'organize' }, { from: 'start', to: 'think' }, { from: 'organize', to: 'connect' }, { from: 'think', to: 'done' }],
};
export const publishingWorkflow: Workflow = {
  description: b('يُستلم المحتوى مرة واحدة، ثم تُهيّأ النسخ بحسب القناة. يتفرع المسار إلى قنوات الفيديو أو قنوات المنشورات، ثم تُجمع حالة النشر أو التجهيز في سجل واحد.', 'Content is submitted once and adapted for each channel. The flow branches into video channels and post channels, then brings publishing or preparation status into one record.'),
  nodes: [ { id: 'submit', kind: 'trigger', label: b('أرسل المحتوى مرة', 'Submit once') }, { id: 'prepare', kind: 'process', label: b('هيّئ لكل قناة', 'Adapt per channel') }, { id: 'video', kind: 'integration', label: b('YouTube · Instagram', 'YouTube · Instagram') }, { id: 'posts', kind: 'integration', label: b('LinkedIn · Facebook · X', 'LinkedIn · Facebook · X') }, { id: 'status', kind: 'result', label: b('نشر أو تجهيز موثّق', 'Publish or prepare') } ],
  edges: [{ from: 'submit', to: 'prepare' }, { from: 'prepare', to: 'video' }, { from: 'prepare', to: 'posts' }, { from: 'video', to: 'status' }, { from: 'posts', to: 'status' }],
};
export const crmWorkflow: Workflow = {
  description: b('تصل رسالة واتساب أو رسالة نصية عبر تويليو. يُطابق المرسل مع سجلات العملاء وتُستكمل المعلومات الناقصة، ثم يُنشأ السجل أو يُحدّث ويُحال السياق إلى الموظف عند الحاجة.', 'A WhatsApp or SMS message arrives through Twilio. The sender is matched to a CRM contact and missing details are collected. A record is created or updated, with context handed to staff when needed.'),
  nodes: [ { id: 'message', kind: 'trigger', label: b('رسالة واردة', 'Message received') }, { id: 'twilio', kind: 'integration', label: b('Twilio', 'Twilio') }, { id: 'match', kind: 'process', label: b('طابق واستكمل', 'Match & collect') }, { id: 'save', kind: 'integration', label: b('CRM', 'CRM') }, { id: 'handoff', kind: 'result', label: b('سياق واضح للفريق', 'A clear staff handoff') } ],
  edges: [{ from: 'message', to: 'twilio' }, { from: 'twilio', to: 'match' }, { from: 'match', to: 'save' }, { from: 'save', to: 'handoff' }],
};
