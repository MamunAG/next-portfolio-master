import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <Table>
      <TableCaption>Loading...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>
            <Skeleton className="h-7 w-[35%]" />
          </TableHead>
          <TableHead></TableHead>
          <TableHead>
            <Skeleton className="h-7 w-[35%]" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-7 w-[250px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-7 w-[250px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-7 w-[250px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-7 w-[250px]" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
