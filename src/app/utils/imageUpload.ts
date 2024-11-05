export const uploadImage = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = () => {
          reject(new Error('Ошибка загрузки изображения'));
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    };

    input.click();
  });
};
