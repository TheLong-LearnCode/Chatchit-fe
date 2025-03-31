

export const handleAvatarChangeHelper = (event: React.ChangeEvent<HTMLInputElement>,setAvatar:any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setAvatar(reader.result as string); // Base64 string
        }
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    }
  };