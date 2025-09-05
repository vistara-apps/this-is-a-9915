export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

export const LEGAL_GUIDES = {
  'CA': {
    guideId: 'ca-guide',
    state: 'CA',
    title: 'California Rights During Police Encounters',
    content: {
      summary: 'In California, you have specific rights during police encounters that are protected by both federal and state law.',
      rights: [
        'You have the right to remain silent beyond providing your name if lawfully detained',
        'You have the right to refuse searches of your person, vehicle, or home without a warrant',
        'You have the right to ask if you are free to leave',
        'You have the right to record police interactions in public spaces',
        'You have the right to an attorney if arrested'
      ],
      specifics: [
        'California Penal Code 148(g) protects your right to record police',
        'Stop and identify laws require only name disclosure when lawfully detained',
        'Vehicle searches require consent, warrant, or probable cause',
        'You can refuse field sobriety tests (with license consequences)'
      ]
    }
  },
  'NY': {
    guideId: 'ny-guide',
    state: 'NY',
    title: 'New York Rights During Police Encounters',
    content: {
      summary: 'New York law provides specific protections during police encounters, with some unique provisions.',
      rights: [
        'You have the right to remain silent',
        'You have the right to refuse searches without a warrant',
        'You have the right to ask if you are free to leave',
        'You have the right to record police interactions',
        'You have the right to an attorney if arrested'
      ],
      specifics: [
        'NY Civil Rights Law §79-p protects recording rights',
        'Stop and frisk requires reasonable suspicion',
        'Vehicle searches follow federal Fourth Amendment standards',
        'Immigration status cannot be the sole basis for detention'
      ]
    }
  },
  'TX': {
    guideId: 'tx-guide',
    state: 'TX',
    title: 'Texas Rights During Police Encounters',
    content: {
      summary: 'Texas law provides constitutional protections with specific state provisions.',
      rights: [
        'You have the right to remain silent',
        'You have the right to refuse searches without probable cause',
        'You have the right to ask if you are free to leave',
        'You have the right to record police interactions',
        'You have the right to an attorney if arrested'
      ],
      specifics: [
        'Texas Penal Code 38.02 requires identification only upon lawful arrest',
        'Open carry laws allow recording in public spaces',
        'Vehicle searches require consent, warrant, or exigent circumstances',
        'You can refuse field sobriety tests'
      ]
    }
  }
};

export const SCRIPTS = {
  'en': {
    traffic_stop: [
      "I am exercising my right to remain silent.",
      "I do not consent to any searches.",
      "Am I free to leave?",
      "I would like to speak with an attorney.",
      "I am not resisting, but I do not consent."
    ],
    street_encounter: [
      "Am I being detained or am I free to go?",
      "I am exercising my right to remain silent.",
      "I do not consent to any searches.",
      "I would like to contact my attorney.",
      "I am not answering any questions without my lawyer present."
    ],
    arrest: [
      "I am exercising my right to remain silent.",
      "I want to speak with an attorney immediately.",
      "I do not consent to any searches.",
      "I am not resisting arrest.",
      "Please document any injuries I may have sustained."
    ]
  },
  'es': {
    traffic_stop: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ninguna búsqueda.",
      "¿Soy libre de irme?",
      "Me gustaría hablar con un abogado.",
      "No me estoy resistiendo, pero no consiento."
    ],
    street_encounter: [
      "¿Estoy siendo detenido o soy libre de irme?",
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ninguna búsqueda.",
      "Me gustaría contactar a mi abogado.",
      "No voy a responder ninguna pregunta sin mi abogado presente."
    ],
    arrest: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "Quiero hablar con un abogado inmediatamente.",
      "No consiento a ninguna búsqueda.",
      "No me estoy resistiendo al arresto.",
      "Por favor documenten cualquier lesión que pueda haber sufrido."
    ]
  }
};