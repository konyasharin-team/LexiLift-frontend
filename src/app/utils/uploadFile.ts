export const uploadFile = async (
  fileType: string,
  fileMaxSizeMb = 1,
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = fileType;

    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > fileMaxSizeMb * 1024 * 1024) {
          reject(new Error('Файл слишком большого размера'));
        }
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = () => {
          reject(new Error('Ошибка загрузки файла'));
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
      input.remove();
    };

    input.click();
  });
};
