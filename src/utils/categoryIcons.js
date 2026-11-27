const iconRules = [
  { icon: 'paw', terms: ['PET', 'ANIMAL', 'VETERIN', 'TOSADOR', 'BANHO E TOSA', 'CRIADOR DE AVES'] },
  { icon: 'beauty', terms: ['BELEZA', 'CABELEIRE', 'CILIO', 'ESTET', 'DEPIL', 'BRONZE', 'UNHA', 'SOBRANCELHA', 'MANICURE', 'LASH', 'TRANCISTA', 'MAQUI', 'SALAO'] },
  { icon: 'food', terms: ['ACAI', 'ACOUGUE', 'ADEGA', 'ALIMENTO', 'BAR', 'BEBIDA', 'BOLO', 'BUFFET', 'CAFE', 'CARN', 'CESTA DE', 'CHURR', 'CONFEIT', 'COZINH', 'DOC', 'ESPETINHO', 'GASTRON', 'HAMB', 'HORTIFRUTI', 'LANCHE', 'PIZZ', 'RESTAURANTE', 'SALGADO', 'SORVET', 'SUSHI', 'SUPERMERCADO', 'BARMAN'] },
  { icon: 'heart', terms: ['SAUDE', 'CLINICA', 'MEDIC', 'ENFERMEIR', 'FISIO', 'DENTISTA', 'PSIC', 'FARMAC', 'CARDIO', 'GINECO', 'TERAPEUTA', 'OFTALM', 'NUTRI', 'CUIDADOR', 'RADIOLOG', 'LABORATORIO', 'PODOLOG'] },
  { icon: 'book', terms: ['ESCOLA', 'PROFESSOR', 'FACULDADE', 'CURSO', 'PEDAGOG', 'CRECHE', 'ALFABETIZADOR', 'REFORCO', 'PREPARATORIO', 'ACADEMICA'] },
  { icon: 'plane', terms: ['VIAGEM', 'TURISMO', 'HOTEL', 'POUSADA'] },
  { icon: 'car', terms: ['VEICULO', 'CARRO', 'MOTO', 'MOBILIDADE', 'AUTOESCOLA', 'TRANSPORT', 'ENTREGADOR', 'MOTORISTA', 'COMBUSTIVEL', 'BORRACHEIRO', 'LAVA JATO'] },
  { icon: 'sport', terms: ['ATLETA', 'JOGADOR', 'FUTEBOL', 'FUTSAL', 'PERSONAL TRAINER', 'ACADEMIA', 'JIU-JITSU', 'MUAY THAI', 'CICLISMO', 'CICLISTA'] },
  { icon: 'art', terms: ['ARTISTA', 'ARTES', 'DESIGN', 'FOTOGRAF', 'MUSICO', 'CANTOR', 'BANDA', 'DJ', 'ATOR', 'BAIXISTA', 'GUITARR', 'LOCUTOR', 'DECORAD', 'CERIMONIAL', 'HUMORISTA', 'EVENTO', 'FESTA'] },
  { icon: 'home', terms: ['CONSTRUT', 'ARQUITET', 'PEDREIRO', 'PINTOR', 'GESSEIRO', 'IMOBILIARIA', 'MOVEIS', 'REFORMA', 'ELETRICISTA', 'HIDRAULICO', 'SERRALHEIRO', 'MARCENEIRO', 'VIDRACARIA'] },
  { icon: 'leaf', terms: ['NATURAL', 'AMBIENTAL', 'ENERGIA SOLAR', 'FLORICULTURA', 'FLORISTA', 'GRANJA', 'AGRICULT', 'MEIO AMBIENTE'] },
  { icon: 'shopping', terms: ['LOJA', 'VENDEDOR', 'VENDEDORA', 'COMERC', 'PAPELARIA', 'PERFUMARIA', 'AUTOPECAS', 'BAZAR', 'BRECHO', 'MERCANTIL', 'REVENDA', 'OTICA'] },
  { icon: 'business', terms: ['EMPRESA', 'ADVOGAD', 'CONTADOR', 'CONSULTOR', 'SECRETARI', 'ASSISTENTE', 'AGENTE', 'ASSESSORIA', 'EMPREENDEDOR', 'SOCIAL MEDIA', 'GERENTE', 'RADIALISTA', 'BANCARIO', 'CORRETOR'] },
  { icon: 'music', terms: ['MUSICA', 'MUSICAL', 'MUSICISTA', 'INSTRUMENTISTA', 'SANFONEIRO', 'VIOLONISTA'] },
  { icon: 'tools', terms: ['TECNICO', 'MANUTEN', 'REFRIGERACAO', 'AR-CONDICIONADO', 'SERVICOS GERAIS', 'FAXINA', 'LIMPEZA'] },
];

function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleUpperCase('pt-BR');
}

export function getCategoryIcon(category) {
  if (category === 'Todas') return 'grid';

  const normalizedCategory = normalize(category);
  const rule = iconRules.find(({ terms }) =>
    terms.some((term) => normalizedCategory.includes(term)),
  );

  return rule?.icon ?? 'tag';
}
