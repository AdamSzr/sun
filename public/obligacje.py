import matplotlib.pyplot as plt

# Parametry inwestycji
miesieczna_inwestycja = 1000        # zł
oprocentowanie_roczne = 0.054       # 5.4%
oprocentowanie_miesieczne = oprocentowanie_roczne / 12
wartosc_obligacji = 100
okres_lat = 40
okres_miesiecy = okres_lat * 12
okres_wplat = 25 * 12  # tylko przez 20 lat wpłaty

# Stan początkowy
obligacje = 0
gotowka = 0
historia_wartosci = []
historia_odsetek = []
historia_wplat = []

for miesiac in range(okres_miesiecy):
    # Wpłaty tylko przez pierwsze 20 lat
    if miesiac < okres_wplat:
        gotowka += miesieczna_inwestycja
    suma_wplat = min(miesiac + 1, okres_wplat) * miesieczna_inwestycja
    historia_wplat.append(suma_wplat)

    # Kupno nowych obligacji za 100 zł
    nowe_obligacje = int(gotowka // wartosc_obligacji)
    obligacje += nowe_obligacje
    gotowka -= nowe_obligacje * wartosc_obligacji

    # Odsetki od wszystkich obligacji
    odsetki = obligacje * wartosc_obligacji * oprocentowanie_miesieczne
    gotowka += odsetki

    # Kupujemy kolejne obligacje za odsetki
    nowe_obligacje = int(gotowka // wartosc_obligacji)
    obligacje += nowe_obligacje
    gotowka -= nowe_obligacje * wartosc_obligacji

    # Wartość całkowita
    wartosc_portfela = obligacje * wartosc_obligacji + gotowka
    historia_wartosci.append(wartosc_portfela)

    # Zysk z odsetek (różnica między wartością a wpłatami)
    zysk_z_odsetek = wartosc_portfela - suma_wplat
    historia_odsetek.append(zysk_z_odsetek)

# Wykres
plt.figure(figsize=(10, 6))
plt.plot(range(okres_miesiecy), historia_wartosci,
         label='Całkowita wartość portfela', color='green', linewidth=2)
plt.plot(range(okres_miesiecy), historia_odsetek,
         label='Zysk z oprocentowania', color='orange', linestyle='--', linewidth=2)
plt.plot(range(okres_miesiecy), historia_wplat,
         label='Suma wpłat (kapitał)', color='blue', linestyle=':', linewidth=2)

# Linia pionowa pokazująca moment zakończenia wpłat
plt.axvline(x=okres_wplat, color='gray', linestyle='-.',
            label='Koniec wpłat (20 lat)')

plt.title('Symulacja inwestycji w obligacje 5.4% – 20 lat wpłat + 20 lat pasywnie')
plt.xlabel('Miesiące')
plt.ylabel('Wartość (zł)')
plt.grid(True, linestyle=':')
plt.legend()
plt.tight_layout()
plt.show()

# Wynik końcowy
print(f"Wartość końcowa po 40 latach: {historia_wartosci[-1]:,.2f} zł")
print(f"Zysk z oprocentowania: {historia_odsetek[-1]:,.2f} zł")
print(f"Suma wpłat (po 20 latach): {historia_wplat[-1]:,.2f} zł")
print(f"Liczba obligacji: {obligacje}, Gotówka: {gotowka:.2f} zł")
