// src/services/Translator.ts

// Định nghĩa kiểu dữ liệu trả về để hứng kết quả
export interface TranslationResult {
  original: string;
  translated: string;
  sourceLang: string;
  success: boolean;
}

/**
 * Hàm dịch văn bản sử dụng API Google Translate (Client gtx)
 * @param text Văn bản cần dịch
 * @param targetLang Mã ngôn ngữ đích (mặc định là 'vi')
 */
export const translateText = async (
  text: string, 
  targetLang: string = 'vi'
): Promise<TranslationResult> => {
  try {
    const baseUrl = "https://translate.googleapis.com/translate_a/single";
    
    // Cấu hình tham số URL
    const params = new URLSearchParams({
      client: "gtx",      // Client type
      sl: "auto",         // Source language (auto detect)
      tl: targetLang,     // Target language
      dt: "t",            // Data type (translation only)
      q: text             // Query text
    });

    const url = `${baseUrl}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Lỗi kết nối: ${response.status}`);
    }

    const data = await response.json();

    // Google trả về dạng mảng lồng nhau: [[["Text dịch", "Text gốc"]], "ngôn ngữ nguồn", ...]
    // Cần nối các đoạn text dịch lại với nhau (nếu câu dài)
    const translatedText = data[0]
      .map((segment: any) => segment[0])
      .join("");

    const detectedSourceLang = data[2]; // Vị trí chứa mã ngôn ngữ nguồn

    return {
      original: text,
      translated: translatedText,
      sourceLang: detectedSourceLang,
      success: true,
    };

  } catch (error) {
    console.error("Translation Error:", error);
    return {
      original: text,
      translated: "Lỗi dịch thuật. Vui lòng thử lại.",
      sourceLang: "",
      success: false,
    };
  }
};