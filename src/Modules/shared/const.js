export const TAG_OPTIONS = [
  { label: 'Priority', value: 'Priority', disabled: false },
  { label: 'Non-priority', value: 'Non-priority', disabled: false },
  { label: 'Work', value: 'Work', disabled: false },
  { label: 'Personal', value: 'Personal', disabled: false },
  { label: 'Important', value: 'Important', disabled: false },
  { label: 'Urgent', value: 'Urgent', disabled: false },
  { label: 'Research', value: 'Research', disabled: false },
  { label: 'Review', value: 'Review', disabled: false },
];

export const CONTRADICTORY_TAGS = {
  'Priority': ['Non-priority'],
  'Non-priority': ['Priority', 'Urgent', 'Important'],
  'Urgent': ['Non-priority'],
  'Important': ['Non-priority'],
  'Work': ['Personal'],
  'Personal': ['Work'],
};

export const STATUS_OTIONS = [
  'Pending',
  'In progress',
  'Completed'
]