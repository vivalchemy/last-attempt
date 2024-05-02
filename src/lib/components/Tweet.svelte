<script>
  export let url = "";
  export let text;
  </script>

    <a href="https://twitter.com/frcrce_bandra/status/{url}" class="card">
      <div class="user">
        <div class="profile">
          <img src="frcrce.jpg" alt="avatar" class="ava">
          <div class="username">
            <h3 class="name">Frcrce</h3>
            <p class="uname">@frcrce_offcial</p>
          </div>
        </div>
      <!-- logo -->
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30" fill="white">
        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
        </svg>
      </div>
<div class="twitt">{text}</div>
      <div class="insight">
        <div class="like">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="heart">
              <path id="Vector" d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>

        </div>
      </div>
    </a>
<style>

:root {
  /* font-family: "Source Sans 3", sans-serif; */
  font-weight: 400;
  color-scheme: light dark;
  color: #fff;
  background-color: #141d26;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

p,
h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 400px;
  height: auto;
  padding: 15px 20px;
  gap: 15px;
  border-radius: 10px;
  background: #243447;
  box-shadow: 0px 15px 60px 0px rgba(52, 81, 116, 0.15);
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile {
  display: flex;
  align-items: center;
  gap: 22px;
}

.ava {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.icon {
  font-size: 30px;
  color: #1da1f2;
}

.username {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1px;
}

.username .name {
  line-height: normal;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
}

.username .uname {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.twitt .tag {
  text-decoration: none;
  color: #1da1f2;
}

.insight {
  display: flex;
  align-items: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
}

.like {
  display: flex;
  align-items: center;
  gap: 10px;
}

.like svg:hover {
  fill: crimson;
  filter: drop-shadow(0 0 10px crimson);
  cursor: pointer;
}

</style>