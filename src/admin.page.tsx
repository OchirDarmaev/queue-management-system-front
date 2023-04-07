import { CssBaseline, Link, Stack, Typography } from "@mui/material";

export function AdminPage() {
  return (
    <>
      <CssBaseline />
      <Typography variant="h1">Admin</Typography>
      <Stack>
        <Link href="/services">Services</Link>
        <Link href="/servicePoints">Service Points</Link>
      </Stack>
    </>
  );
}
