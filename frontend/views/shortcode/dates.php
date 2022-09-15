<?php
if (isset($_GET["start"]) && !empty($_GET["start"])) {
    $start = $_GET["start"];
    $date = date('d-m-Y', strtotime($start));
} else {
    $date = date('d-m-Y', strtotime("now"));
}
?>

<script>
    const showTimeTable = <?php echo isset($_GET["start"]) && !empty($_GET["start"]) ? "true" : "false"; ?>;
    const startFrom = "<?php echo $date; ?>";
    const timeTableDates = {
        name: "Ibrahim",
        email: "awesomecoder.dev@gmail.com"
    }
</script>

<div class="relative w-full">
    <div id="timeTableDates"></div>
</div>