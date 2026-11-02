import impressoraUm from './assets/impressoraum.png'
import impressoraDois from './assets/impressoradois.png'
import resinaUm from './assets/resinaUm.png'
import resinaDois from './assets/resinaDois.png'
import filamentoUm from './assets/filamentoUm.png'
import filamentoDois from './assets/filamentoDois.png'
import pecasUm from './assets/pecasUm.png'
import pecasDois from './assets/pecasDois.png'
import acessoriosUm from './assets/acessoriosUm.png'
import acessoriosDois from './assets/acessoriosDois.png'

// Para adicionar um produto novo, basta incluir um objeto na lista da categoria.
export const categorias = {
  impressora: {
    titulo: 'Impressoras 3D',
    produtos: [
      { id: 'imp-1', nome: 'Impressora 3D 400x400x450 Pro', preco: 7099, imagem: impressoraUm },
      { id: 'imp-2', nome: 'Impressora 3D 400x400x450 Lite', preco: 2099, imagem: impressoraDois },
    ],
  },
  resina: {
    titulo: 'Resinas',
    produtos: [
      { id: 'res-1', nome: 'Resina UV Standard 1kg', preco: 7099, imagem: resinaUm },
      { id: 'res-2', nome: 'Resina UV Flexível 1kg', preco: 2099, imagem: resinaDois },
    ],
  },
  filamento: {
    titulo: 'Filamentos',
    produtos: [
      { id: 'fil-1', nome: 'Filamento PLA 1kg', preco: 7099, imagem: filamentoUm },
      { id: 'fil-2', nome: 'Filamento PETG 1kg', preco: 2099, imagem: filamentoDois },
    ],
  },
  pecas: {
    titulo: 'Peças',
    produtos: [
      { id: 'pec-1', nome: 'Kit de peças de reposição A', preco: 7099, imagem: pecasUm },
      { id: 'pec-2', nome: 'Kit de peças de reposição B', preco: 2099, imagem: pecasDois },
    ],
  },
  acessorios: {
    titulo: 'Acessórios',
    produtos: [
      { id: 'ace-1', nome: 'Kit de acessórios A', preco: 7099, imagem: acessoriosUm },
      { id: 'ace-2', nome: 'Kit de acessórios B', preco: 2099, imagem: acessoriosDois },
    ],
  },
}
