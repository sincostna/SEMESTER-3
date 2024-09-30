def get_minimum_coins(money, coins): #prameter
    result = {}
    count_coin = 0

    # Urutkan koin dari terbesar ke terkecil
    coins.sort(reverse=True)

    for coin in coins:
        if money <= 0:
            break
        count = money // coin  # Berapa banyak koin yang bisa digunakan
        if count > 0:
            money -= coin * count  # Kurangi uang dengan nilai koin yang digunakan
            result[coin] = count   # Simpan jumlah koin yang digunakan
            count_coin += count    # Tambahkan jumlah koin ke total

    if money > 0:
        return None, None  # Tidak ada solusi jika uang tersisa tidak bisa dipecah dengan koin yang ada
    return result, count_coin

def main():
    try:
        money = int(input("Masukkan nominal uang = "))
        if money <= 0:
            print("Nominal uang harus lebih dari 0.")
            return

        # Meminta input semua nilai koin dalam satu baris
        coin_values = input("Masukkan nominal koin pecahan yang diinginkan (pisahkan dengan spasi) = ")
        coins = list(map(int, coin_values.split()))  # Mengonversi input menjadi list integer

        if not coins or any(c <= 0 for c in coins):
            print("Harap masukkan nilai koin yang valid.")
            return

        result, count_coin = get_minimum_coins(money, coins)

        if result is None:
            print("Tidak ada kombinasi koin yang dapat memenuhi jumlah uang tersebut.")
        else:
            print(f"Banyak koin yang didapat = {count_coin}")
            print("Rincian = ")
            for coin, count in result.items():
                print(f"Koin {coin} = {count} keping")

    except ValueError:
        print("Input tidak valid. Masukkan angka yang benar.")

if __name__ == "__main__":
    main()

