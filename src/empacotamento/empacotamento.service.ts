import { Injectable } from "@nestjs/common";
import { CAIXAS } from "src/caixas.constants";
import { ProdutoDto } from "src/pedidos/dto/produto.dto";

function volume(d: { h: number; w: number; l: number }) {
    return d.h * d.w * d.l;
}

function troca(dim: [number, number, number]): [number, number, number][] {
    const [a, b, c] = dim;
    return [
        [a, b, c],
        [a, c, b],
        [b, a, c],
        [b, c, a],
        [c, a, b],
        [c, b, a],
    ];
}

@Injectable()
export class EmpacotamentoService {
    empacotamentoPedido(pedido: { pedido_id: number; produtos: ProdutoDto[] }) {

        const prods = pedido.produtos.map(p => ({
            ...p,
            volume: p.dimensoes.altura * p.dimensoes.largura * p.dimensoes.comprimento
        }));

        const caixasAbertas: any[] = [];

        for (const prod of prods) {
            let colocado = false;

            // tenta colocar em caixas já abertas
            for (const cx of caixasAbertas) {
                const cabeTam = this.produtoCabeNaCaixa(prod, cx.caixaDims);
                if (!cabeTam) continue;

                if (cx.restaTam >= prod.volume) {
                    cx.produtos.push(prod.produto_id);
                    cx.restaTam -= prod.volume;
                    colocado = true;
                    break;
                }
            }

            if (!colocado) {
                // escolhe a menor caixa possível
                const caixaSelecionada = CAIXAS.slice()
                    .sort((a, b) => volume(a.dims) - volume(b.dims))
                    .find(c => this.produtoCabeNaCaixa(prod, c.dims));

                if (!caixaSelecionada) {
                    caixasAbertas.push({
                        caixa_id: null,  // nulo de verdade
                        produtos: [prod.produto_id],
                        observacao: 'Produto não cabe em nenhuma caixa disponível.',
                    });
                    continue;
                }

                caixasAbertas.push({
                    caixa_id: caixaSelecionada.id,
                    caixaDims: caixaSelecionada.dims,
                    produtos: [prod.produto_id],
                    restaTam: volume(caixaSelecionada.dims) - prod.volume
                });
            }
        }

        // retorna somente o necessário
        const caixasFormatadas = caixasAbertas.map(c => {
            const { caixaDims, restaTam, ...rest } = c; // remove campos internos
            return rest;
        });

        return {
            pedidos: [{
                pedido_id: pedido.pedido_id,
                caixas: caixasFormatadas
            }]
        };
    }

    produtoCabeNaCaixa(prod: any, caixaDims: { h: number; w: number; l: number }) {
        const dims: [number, number, number] = [prod.dimensoes.altura, prod.dimensoes.largura, prod.dimensoes.comprimento];
        const perms = troca(dims);
        for (const p of perms) {
            if (p[0] <= caixaDims.h && p[1] <= caixaDims.w && p[2] <= caixaDims.l)
                return true;
        }
        return false;
    }
}
