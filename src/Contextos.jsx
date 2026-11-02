import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)

export const formatar = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const ler = (chave, padrao) => {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao
  } catch {
    return padrao
  }
}

const CUPONS = { '3D10': 0.1, BEMVINDO: 0.05 }
const FRETE_GRATIS_ACIMA = 500
const FRETE_FIXO = 29.9

export function LojaProvider({ children }) {
  const [itens, setItens] = useState(() => ler('carrinho', []))
  const [usuario, setUsuario] = useState(() => ler('usuario', null))
  const [cupom, setCupom] = useState(null)

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens])
  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario))
  }, [usuario])

  // guardamos só id, nome, preço e quantidade (a imagem vem do cadastro de produtos)
  const adicionar = (p, qtd = 1) =>
    setItens((atual) => {
      const existe = atual.find((i) => i.id === p.id)
      if (existe) return atual.map((i) => (i.id === p.id ? { ...i, qtd: Math.min(99, i.qtd + qtd) } : i))
      return [...atual, { id: p.id, nome: p.nome, preco: p.preco, imagem: p.imagem, qtd }]
    })

  const alterarQtd = (id, qtd) =>
    setItens((atual) => atual.map((i) => (i.id === id ? { ...i, qtd: Math.min(99, Math.max(1, qtd)) } : i)))

  const remover = (id) => setItens((atual) => atual.filter((i) => i.id !== id))
  const limpar = () => {
    setItens([])
    setCupom(null)
  }

  // devolve true se o cupom existe
  const aplicarCupom = (codigo) => {
    const c = codigo.trim().toUpperCase()
    if (!CUPONS[c]) return false
    setCupom(c)
    return true
  }

  const quantidadeTotal = itens.reduce((t, i) => t + i.qtd, 0)
  const subtotal = itens.reduce((t, i) => t + i.preco * i.qtd, 0)
  const desconto = cupom ? subtotal * CUPONS[cupom] : 0
  const frete = itens.length === 0 || subtotal - desconto >= FRETE_GRATIS_ACIMA ? 0 : FRETE_FIXO
  const total = subtotal - desconto + frete

  return (
    <Ctx.Provider
      value={{
        itens, adicionar, alterarQtd, remover, limpar,
        cupom, aplicarCupom, quantidadeTotal, subtotal, desconto, frete, total,
        usuario, entrar: setUsuario, sair: () => setUsuario(null),
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export const useLoja = () => useContext(Ctx)
