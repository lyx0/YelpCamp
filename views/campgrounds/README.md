For in show.ejs

```

<script>
   const mapToken = "<%-process.env.MAPBOX_TOKEN%>";
   const campground = <%-JSON.stringify(campground)%>;
</script>

```

to work add this to vscode settings

    "html.validate.scripts": false

also DO NOT TOUCH THE SCRIPT IT LOOKS WRONG BUT IT ISNT IT WILL JUST BREAK
