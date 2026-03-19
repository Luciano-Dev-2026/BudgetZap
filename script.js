const SERVICOS = [
    { id: 1, nome: "Limpeza Completa", preco: 150 },
    { id: 2, nome: "Carga de Gás", preco: 200 },
    { id: 3, nome: "Troca de Capacitor", preco: 120 },
    { id: 4, nome: "Instalação", preco: 450 }
];

const WHATSAPP_DESTINO = "5521976703419";

function renderizarServicos() {
    const div = document.querySelector('.servicos');
    div.innerHTML = SERVICOS.map(s => `
        <div class="item-servico">
            <div>
                <strong>${s.nome}</strong><br>
                <span>R$ ${s.preco},00</span>
            </div>
            <input type="checkbox" value="${s.preco}" data-nome="${s.nome}" onchange="calcular()">
        </div>
    `).join('');
}

function calcular() {
    let total = 0;
    const selecionados = document.querySelectorAll('input:checked');
    selecionados.forEach(s => total += parseFloat(s.value));
    document.getElementById('preco-total').innerText = `R$ ${total.toFixed(2)}`;
}

function enviarOrcamento() {
    const selecionados = document.querySelectorAll('input:checked');
    if (selecionados.length === 0) return alert("Selecione ao menos um serviço!");

    let texto = "Olá! Gostaria de fechar um serviço:\n\n";
    let total = 0;

    selecionados.forEach(s => {
        texto += `- ${s.getAttribute('data-nome')}: R$ ${s.value}\n`;
        total += parseFloat(s.value);
    });

    texto += `\n*Total: R$ ${total.toFixed(2)}*`;
    
    const link = `https://wa.me/${WHATSAPP_DESTINO}?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
}

renderizarServicos();
