    // Fungsi untuk mengupdate data secara real-time
    function updateData() {
        // Simulasi data sensor
        const suhu = 24 + Math.random() * 4;
        const kekeruhan = 5 + Math.random() * 4;
        
        // Update nilai display
        document.getElementById('suhu-value').textContent = suhu.toFixed(1);
        document.getElementById('kekeruhan-value').textContent = kekeruhan.toFixed(1);
        
        // Update status
        const statusText = document.querySelector('.status-text');
        if (suhu >= 24 && suhu <= 28 && kekeruhan < 10) {
            statusText.textContent = 'NORMAL';
            statusText.style.color = '#4CAF50';
        } else {
            statusText.textContent = 'PERHATIAN';
            statusText.style.color = '#ff0000';
        }

        // Update grafik
        const chart = Chart.getChart("ParameterChart");
        const newTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        chart.data.labels.push(newTime);
        chart.data.datasets[0].data.push(suhu);
        chart.data.datasets[1].data.push(kekeruhan);
        
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
            chart.data.datasets[1].data.shift();
        }
        
        chart.update();
    }

    // Inisialisasi grafik
    const ctx = document.getElementById('ParameterChart').getContext('2d');
    const ParameterChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Suhu Air (°C)',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                },
                {
                    label: 'Kekeruhan Air (NTU)',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Waktu',
                        font: { size: 14 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Suhu',
                        font: { size: 14 }
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 500
            }
        }
    });

    // Update data setiap 2 detik
    setInterval(updateData, 2000);